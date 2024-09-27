import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { log } from "@repo/logger";
import { getConfig } from "../config";

interface HandlerOptions {
  skipJwtAuth?: boolean;
}

const config = getConfig();

export const authorization =
  (handler: RequestHandler, options?: HandlerOptions): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    log({ level: "info", message: req.url });
    if (!options?.skipJwtAuth) {
      const token = req.headers["authorization"];
      if (token) {
        try {
          const t = token.replace("Bearer ", "").replace("Bearer", "");
          jwt.verify(t, config.secret);
        } catch (error) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        return res.status(401).json({ message: "Auth token is not provided" });
      }
    }

    return handler(req, res, next);
  };
