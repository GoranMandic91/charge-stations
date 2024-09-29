import { ObjectId } from "mongodb";
import { database } from "../../database";
import { SessionDocument } from "../../types";

export const findSessionStatistics = async (id: string): Promise<any> => {
  const { mongoClient } = database();

  const sessionsCollection = mongoClient()
    .db()
    .collection<SessionDocument>("sessions");

  const mostSessions = await sessionsCollection
    .aggregate([
      { $match: { officeId: id } },
      { $group: { _id: "$userId", totalSessions: { $sum: 1 } } },
      { $sort: { totalSessions: -1 } },
      { $limit: 5 },
    ])
    .toArray();

  const longestChargingTime = await sessionsCollection
    .aggregate([
      { $match: { officeId: id } },
      {
        $group: {
          _id: "$userId",
          totalChargingTime: { $sum: "$sessionDuration" },
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
