export interface Config {
  port: number;
  secret: string;
  dbUrl: string;
}
export const getConfig = (): Config => {
  const { PORT = "3000", SECRET = "secret", DB_URL = "" } = process.env;

  return {
    port: parseInt(PORT, 10),
    secret: SECRET,
    dbUrl: DB_URL,
  };
};
