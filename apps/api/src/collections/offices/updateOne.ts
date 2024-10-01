import { ObjectId } from "mongodb";
import { findAll } from "./findAll";
import { database } from "../../database";
import { Charger, ChargerRequest, OfficeDocument } from "../../types";
import { getConfig } from "../../config";

export const updateOne = async (params: ChargerRequest): Promise<void> => {
  const { mongoClient } = database();

  const config = getConfig();

  const currentDate = new Date();
  const { officeId, chargerId, user } = params;

  const offices = await findAll({ _id: new ObjectId(officeId) });
  const office = offices[0];
  if (!office) {
    throw new Error("Office not exists");
  }

  let charger: Charger | undefined;
  if (chargerId) {
    const { chargers } = offices[0];
    charger = chargers[chargerId - 1];
    if (!charger) {
      throw new Error("Charger not exists");
    }

    if (!charger.available) {
      throw new Error("Charger not available");
    }
  } else {
    charger = office.chargers.find((c) => c.available);
  }

  if (charger) {
    // there is available chargers, take one and update office document
    const newChargerData = {
      id: charger.id,
      available: false,
      reservedBy: user,
      sessionStart: currentDate,
      updatedAt: currentDate,
      createdAt: charger.createdAt,
    };

    await mongoClient()
      .db()
      .collection<OfficeDocument>("offices")
      .updateOne(
        { _id: new ObjectId(officeId) },
        {
          $set: {
            updatedAt: currentDate,
            [`chargers.${charger.id - 1}`]: newChargerData,
          },
        }
      );
  } else {
    // no available chargers, push this request to queue
    await mongoClient()
      .db()
      .collection<OfficeDocument>("offices")
      .updateOne(
        { _id: new ObjectId(officeId) },
        { $push: { queue: { ...params, createdAt: currentDate } } }
      );
  }
};
