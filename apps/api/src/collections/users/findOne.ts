import { Filter } from "mongodb";
import { database } from "../../database";
import { UserDocument } from "../../types";

export const findOne = async (
  filter: Filter<UserDocument>
): Promise<UserDocument | null> => {
  const { mongoClient } = database();

  return await mongoClient()
    .db()
    .collection<UserDocument>("users")
    .findOne(filter);
};
