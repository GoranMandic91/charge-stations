import { ObjectId } from "mongodb";
import { findAll } from "./findAll";
import { database } from "../../database";
import { insertOne } from "../sessions/insertOne";
import { Charger, ChargerRequest, OfficeDocument } from "../../types";

export const removeOne = async (params: ChargerRequest): Promise<void> => {
  const { mongoClient } = database();

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

  if (office.queue.length) {
  }
  const newChargerData: Charger = {
    id: charger.id,
    available: true,
    sessionStart: null,
    sessionEnd: null,
    reservedBy: null,
    updatedAt: currentDate,
    createdAt: charger.createdAt,
  };
  if (office.queue.length) {
    const userRequest = office.queue.shift();
    newChargerData.available = false;
    newChargerData.sessionStart = currentDate;
    newChargerData.sessionEnd = null;
    newChargerData.reservedBy = userRequest?.user ?? null;
    newChargerData.updatedAt = currentDate;
  }

  await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .updateOne(
      { _id: new ObjectId(officeId) },
      {
        $set: {
          updatedAt: currentDate,
          [`chargers.${charger.id - 1}`]: newChargerData,
          queue: office.queue,
        },
      }
    );
};
