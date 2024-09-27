import { Router, Request, Response } from "express";

export const routes = (): Router => {
  const router = Router();

  router.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });
  router.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  return router;
};
