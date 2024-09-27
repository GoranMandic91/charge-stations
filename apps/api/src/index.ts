import { log } from "@repo/logger";
import { createServer } from "./server";
import { database } from "./database";
import { MongoMemoryServer } from "mongodb-memory-server";
import { getConfig } from "./config";

const server = createServer();
const db = database();

const shutdown = async () => {
  try {
    await db.close();
    log("shutdown succeeded, all connections are closed");
  } catch (error) {
    log(`graceful shutdown failed: ${error}`);
  }
};

process.on("SIGINT", shutdown);

(async () => {
  const config = getConfig();
  const dbUrl = await db.connect();
  log(`Successfully connected to db on ${dbUrl}`);
  await db.createIndexes();

  server.listen(config.port, () => {
    log(`server running on http://localhost:${config.port}`);
  });
})();
