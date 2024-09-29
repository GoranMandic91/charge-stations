import { database } from "../../database";
import { SessionDocument } from "../../types";

export const insertOne = async (data: any): Promise<SessionDocument | null> => {
  const { mongoClient } = database();

  const currentDate = new Date();
  const {
    name,
    userId,
    officeId,
    chargerId,
    queuedAt,
    sessionStart,
    sessionEnd,
  } = data;

  const sessionDuration =
    new Date(sessionEnd).getTime() - new Date(sessionStart).getTime();

  const inserted = await mongoClient()
    .db()
    .collection<SessionDocument>("sessions")
    .insertOne({
      name,
      userId,
      officeId,
      chargerId,
      queuedAt,
      sessionStart,
      sessionEnd,
      sessionDuration: sessionDuration,
      createdAt: currentDate,
      updatedAt: currentDate,
    } as SessionDocument);

  return await mongoClient()
    .db()
    .collection<SessionDocument>("sessions")
    .findOne({ _id: inserted.insertedId });
};
