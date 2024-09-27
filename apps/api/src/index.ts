import { log } from "@repo/logger";
import { createServer } from "./server";
import { database } from "./database";
import { MongoMemoryServer } from "mongodb-memory-server";

const port = process.env.PORT || 3000;
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
  const dbUrl = await db.connect();
  log(`Successfully connected to db on ${dbUrl}`);
  await db.createIndexes();

  server.listen(port, () => {
    log(`server running on http://localhost:${port}`);
  });
})();
