import { ObjectId } from "mongodb";
import { findAll } from "./findAll";
import { database } from "../../database";
import { Charger, ChargerRequest, OfficeDocument } from "../../types";

export const updateOne = async (params: ChargerRequest): Promise<void> => {
  const { mongoClient } = database();

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
    let sessionEnd = null;
    const freeChargers = office.chargers.filter((c) => c.available).length;
    if (freeChargers <= 1) {
      const currentDateInMS = currentDate.getTime();
      const highDemandInMS = office.highDemandDuration * 60 * 60 * 1000;
      sessionEnd = new Date(currentDateInMS + highDemandInMS);
    }
    const newChargerData = {
      id: charger.id,
      available: false,
      sessionStart: currentDate,
      sessionEnd: sessionEnd,
      reservedBy: user,
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
      .updateOne({ _id: new ObjectId(officeId) }, { $push: { queue: params } });
  }
};
