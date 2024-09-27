import { Router } from "express";
import { login } from "./routes/auth/login";
import { register } from "./routes/auth/register";

export const routes = (): Router => {
  const router = Router();

  router.get("/health", (_, res) => res.json({ ok: true }));

  router.post("/auth/login", login);
  router.post("/auth/register", register);

  return router;
};
