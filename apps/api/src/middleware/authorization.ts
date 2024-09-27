import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { log } from "@repo/logger";

interface HandlerOptions {
  skipJwtAuth?: boolean;
}

export const authorization =
  (handler: RequestHandler, options?: HandlerOptions): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    log({ level: "info", message: req.url });
    if (!options?.skipJwtAuth) {
      const token = req.headers["authorization"];
      if (token) {
        try {
          const t = token.replace("Bearer ", "").replace("Bearer", "");
          jwt.verify(t, "process.env.SECRET");
        } catch (error) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        return res.status(401).json({ message: "Auth token is not supplied" });
      }
    }

    return handler(req, res, next);
  };
