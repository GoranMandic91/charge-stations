import { log } from "@repo/logger";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoClient: MongoClient;

export const database = () => {
  const connect = async (): Promise<string> => {
    const options = { instance: { port: 27017 } };
    const mongod = await MongoMemoryServer.create(options);
    const dbUrl = mongod.getUri();

    mongoClient = new MongoClient(dbUrl, {
      socketTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    try {
      await mongoClient.connect();
      return dbUrl;
    } catch (error) {
      log({ message: `Failed to connect to MongoDB: ${error}` });
      throw error;
    }
  };

  const close = async () => {
    await mongoClient.close();
  };

  const createIndexes = async () => {
    await mongoClient
      .db()
      .collection("users")
      .createIndex({ email: 1 }, { unique: true });
  };

  return {
    connect,
    close,
    createIndexes,
    mongoClient: () => mongoClient,
  };
};
