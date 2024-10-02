import { database } from "../../database";
import { SessionDocument } from "../../types";

export interface InsertSessionParams {
  name?: string;
  userId?: string;
  officeId: string;
  chargerId: number;
  queuedAt: Date | null;
  sessionStart: Date;
  sessionEnd: Date;
}

export const insertOne = async (
  params: InsertSessionParams
): Promise<SessionDocument | null> => {
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
  } = params;

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
    } as unknown as SessionDocument);

  return await mongoClient()
    .db()
    .collection<SessionDocument>("sessions")
    .findOne({ _id: inserted.insertedId });
};
