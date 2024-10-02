import { database } from "../../database";
import { Charger, ChargerRequest, OfficeDocument } from "../../types";

export interface InsertOfficeParams {
  name: string;
  location: string;
  numOfChargers: number;
  highDemandDuration: number;
}

export const insertOne = async (
  params: InsertOfficeParams
): Promise<OfficeDocument | null> => {
  const { mongoClient } = database();

  const currentDate = new Date();
  const { name, location, numOfChargers, highDemandDuration } = params;

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
      queue: [] as ChargerRequest[],
      createdAt: currentDate,
      updatedAt: currentDate,
    } as OfficeDocument);

  return await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .findOne({ _id: inserted.insertedId });
};
