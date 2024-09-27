import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { check } from "../../utils/check";
import { database } from "../../database";
import { authorization } from "../../middleware/authorization";
import { getConfig } from "../../config";

const config = getConfig();

const loginHandler: RequestHandler = async (req, res) => {
  const { email = undefined, password = undefined } = req.body;

  const { mongoClient } = database();
  const user = await mongoClient().db().collection("users").findOne({ email });

  if (user && check(password, user.password)) {
    const payload = { email: user.email, userId: user._id };
    const token = jwt.sign(payload, config.secret, { expiresIn: "12h" });
    return res.status(200).json({ token, id: user._id });
  }

  return res.status(401).json({ message: "Unauthorized" });
};

export const login: RequestHandler = authorization(loginHandler, {
  skipJwtAuth: true,
});
