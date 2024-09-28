import { database } from "../../database";
import { Charger, OfficeDocument } from "../../types";

export const insertOne = async (data: any): Promise<OfficeDocument | null> => {
  const { mongoClient } = database();

  const currentDate = new Date();
  const { name, location, numOfChargers, highDemandDuration } = data;

  const chargers: Charger[] = new Array(numOfChargers)
    .fill(0)
    .map((_, index) => {
      return {
        id: index + 1,
        sessionStart: null,
        sessionEnd: null,
        available: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      } as Charger;
    });

  const inserted = await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .insertOne({
      name,
      location,
      chargers,
      highDemandDuration,
      createdAt: currentDate,
      updatedAt: currentDate,
    } as OfficeDocument);

  return await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .findOne({ _id: inserted.insertedId });
};
