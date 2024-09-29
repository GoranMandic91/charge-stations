import { ObjectId } from "mongodb";
import { findAll } from "./findAll";
import { insertOne } from "../sessions/insertOne";
import { database } from "../../database";
import { ChargerRequest, OfficeDocument } from "../../types";
import { getConfig } from "../../config";

export const removeOne = async (params: ChargerRequest): Promise<void> => {
  const { mongoClient } = database();

  const config = getConfig();

  const currentDate = new Date();
  const { officeId, chargerId, user } = params;

  const offices = await findAll({ _id: new ObjectId(officeId) });
  const office = offices[0];
  if (!office) {
    throw new Error("Office not exists");
  }

  const { chargers } = offices[0];
  const charger = chargers[chargerId - 1];
  if (!charger) {
    throw new Error("Charger not exists");
  }

  const sessionData = {
    name: charger.reservedBy?.name,
    userId: charger.reservedBy?.id,
    officeId: office._id.toHexString(),
    chargerId: charger.id,
    queuedAt: null,
    sessionStart: charger.sessionStart,
    sessionEnd: new Date(),
  };
  await insertOne(sessionData);

  const newChargerData = {
    id: charger.id,
    available: true,
    sessionStart: null,
    sessionEnd: null,
    reservedBy: null,
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
};
