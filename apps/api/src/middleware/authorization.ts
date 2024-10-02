import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { log } from "@repo/logger";
import { getConfig } from "../config";
import { findOne } from "../collections/users/findOne";

interface HandlerOptions {
  skipJwtAuth?: boolean;
  checkRole?: string;
}

interface Payload extends jwt.JwtPayload {
  email: string;
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
          const decoded = jwt.verify(t, config.secret);
          if (options?.checkRole) {
            const email = (decoded as Payload).email;
            if (email) {
              const user = await findOne({ email });
              if (user && user.role === options.checkRole) {
                return handler(req, res, next);
              }
              return res.status(401).json({ message: "Unauthorized" });
            }
          }
        } catch (error) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        return res.status(401).json({ message: "Auth token is not provided" });
      }
    }
    return handler(req, res, next);
  };
