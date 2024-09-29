import { ObjectId } from "mongodb";
import { database } from "../../database";
import { OfficeDocument } from "../../types";
import { findAll } from "./findAll";

export const updateOne = async (data: {
  officeId: string;
  chargerId: number;
}): Promise<void> => {
  const { mongoClient } = database();

  const currentDate = new Date();
  const { officeId, chargerId } = data;

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

  if (!charger.available) {
    throw new Error("Charger not available");
  }

  const currentDateInMS = currentDate.getTime();
  const highDemandInMS = office.highDemandDuration * 60 * 60 * 1000;
  const sessionEnd = new Date(currentDateInMS + highDemandInMS);
  const newChargerData = {
    id: charger.id,
    available: false,
    sessionStart: currentDate,
    sessionEnd: sessionEnd,
    createdAt: charger.createdAt,
    updatedAt: currentDate,
  };
  await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .updateOne(
      { _id: new ObjectId(officeId) },
      {
        $set: {
          updatedAt: currentDate,
          [`chargers.${chargerId - 1}`]: newChargerData,
        },
      }
    );
};
