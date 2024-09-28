import { Filter } from "mongodb";
import { database } from "../../database";
import { OfficeDocument } from "../../types";

export const findAll = async (
  filter: Filter<OfficeDocument> = {}
): Promise<OfficeDocument[]> => {
  const { mongoClient } = database();

  return await mongoClient()
    .db()
    .collection<OfficeDocument>("offices")
    .find(filter)
    .toArray();
};
