import { Router } from "express";
import { register } from "./routes/auth/register";

export const routes = (): Router => {
  const router = Router();

  router.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });
  router.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  router.post("/auth/register", register);

  return router;
};
