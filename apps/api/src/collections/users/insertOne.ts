import { database } from "../../database";
import { encrypt } from "../../utils/encrypt";
import { UserDocument } from "../../types";

export const insertOne = async (data: any): Promise<UserDocument | null> => {
  const { mongoClient } = database();

  try {
    const currentDate = new Date();
    const { email, password, firstName, lastName, role } = data;

    const inserted = await mongoClient()
      .db()
      .collection<UserDocument>("users")
      .insertOne({
        email,
        password: encrypt(password),
        firstName,
        lastName,
        role,
        createdAt: currentDate,
        updatedAt: currentDate,
      } as UserDocument);

    return await mongoClient()
      .db()
      .collection<UserDocument>("users")
      .findOne({ _id: inserted.insertedId });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new Error("duplicate-user");
    }
    throw error;
  }
};
