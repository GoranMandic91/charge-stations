import { Router } from "express";
import { login } from "./routes/auth/login";
import { register } from "./routes/auth/register";
import { getAllOffices } from "./routes/offices/getAllOffices";
import { getOfficeById } from "./routes/offices/getOfficeById";
import { postOffice } from "./routes/offices/postOffice";
import { patchCharger } from "./routes/chargers/patchCharger";
import { postCharger } from "./routes/chargers/postCharger";
import { getOfficeStatistics } from "./routes/offices/getOfficeStatistics";

export const routes = (): Router => {
  const router = Router();

  router.get("/health", (_, res) => res.json({ ok: true }));

  router.post("/auth/login", login);
  router.post("/auth/register", register);

  router.get("/offices", getAllOffices);
  router.get("/offices/:id", getOfficeById);
  router.get("/offices/:id/statistics", getOfficeStatistics);
  router.post("/offices", postOffice);

  router.patch("/chargers/:id", patchCharger);
  router.post("/chargers", postCharger);

  return router;
};
