export interface Config {
  port: number;
  secret: string;
}
export const getConfig = (): Config => {
  const { PORT = "3000", SECRET = "secret" } = process.env;

  return {
    port: parseInt(PORT, 10),
    secret: SECRET,
  };
};
