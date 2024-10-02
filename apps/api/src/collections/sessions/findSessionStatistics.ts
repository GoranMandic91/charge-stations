import { ObjectId } from "mongodb";
import { database } from "../../database";
import { SessionDocument } from "../../types";

export interface SessionStats {
  name: string;
  userId: string;
  totalSessions: number;
}

export interface DurationStats {
  name: string;
  userId: string;
  totalChargingTime: number;
}

export interface ChargingStatistics {
  sessions: SessionStats[];
  duration: DurationStats[];
}

export const findSessionStatistics = async (
  id: string
): Promise<ChargingStatistics> => {
  const { mongoClient } = database();

  const sessionsCollection = mongoClient()
    .db()
    .collection<SessionDocument>("sessions");

  const mostSessions = await sessionsCollection
    .aggregate<SessionStats>([
      { $match: { officeId: id } },
      {
        $group: {
          _id: { userId: "$userId", name: "$name" },
          totalSessions: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          name: "$_id.name",
          totalSessions: 1,
        },
      },
      { $sort: { totalSessions: -1 } },
      { $limit: 5 },
    ])
    .toArray();

  const longestChargingTime = await sessionsCollection
    .aggregate<DurationStats>([
      { $match: { officeId: id } },
      {
        $group: {
          _id: { userId: "$userId", name: "$name" },
          totalChargingTime: { $sum: "$sessionDuration" },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id.userId",
          name: "$_id.name",
          totalChargingTime: 1,
        },
      },
      { $sort: { totalChargingTime: -1 } },
      { $limit: 5 },
    ])
    .toArray();

  return {
    sessions: mostSessions,
    duration: longestChargingTime,
  };
};
