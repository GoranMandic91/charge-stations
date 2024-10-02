import { database } from "../../database";
import { encrypt } from "../../utils/encrypt";
import { UserDocument } from "../../types";

export interface InsertUserParams {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export const insertOne = async (
  params: InsertUserParams
): Promise<UserDocument | null> => {
  const { mongoClient } = database();

  try {
    const currentDate = new Date();
    const { email, password, fullName, role } = params;

    const inserted = await mongoClient()
      .db()
      .collection<UserDocument>("users")
      .insertOne({
        email,
        password: encrypt(password),
        fullName,
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
