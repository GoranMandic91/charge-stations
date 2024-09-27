import { hashSync, genSaltSync } from "bcrypt";

export const encrypt = (password: string) =>
  hashSync(password, genSaltSync(10));
