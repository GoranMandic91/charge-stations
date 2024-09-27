import { compareSync } from "bcrypt";

export const check = (password: string, encrypted: string) =>
  compareSync(password, encrypted);
