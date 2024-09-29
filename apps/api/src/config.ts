export interface Config {
  port: number;
  secret: string;
  dbUrl: string;
  durationInMS: number;
}
export const getConfig = (): Config => {
  const {
    PORT = "3000",
    SECRET = "secret",
    DB_URL = "",
    DURATION_IN_MS = "60000", // 1 minute in miliseconds
  } = process.env;

  return {
    port: parseInt(PORT, 10),
    secret: SECRET,
    dbUrl: DB_URL,
    durationInMS: parseInt(DURATION_IN_MS, 10),
  };
};
