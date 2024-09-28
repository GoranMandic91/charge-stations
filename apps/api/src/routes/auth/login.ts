import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { getConfig } from "../../config";
import { check } from "../../utils/check";
import { findOne } from "../../collections/users/findOne";
import { authorization } from "../../middleware/authorization";

const config = getConfig();

const loginHandler: RequestHandler = async (req, res) => {
  const { email = undefined, password = undefined } = req.body;
  const user = await findOne({ email });

  if (user && check(password, user.password)) {
    const payload = { email: user.email, userId: user._id };

    const currentTime = new Date().getTime();
    const oneDayInSeconds = 24 * 60 * 60;
    const oneDayInMs = oneDayInSeconds * 1000;
    const expires = new Date(currentTime + oneDayInMs);
    const token = jwt.sign(payload, config.secret, {
      expiresIn: oneDayInSeconds,
    });

    const { _id, email, fullName, role, createdAt, updatedAt } = user;

    return res.json({
      _id,
      email,
      fullName,
      role,
      token,
      createdAt,
      updatedAt,
    });
  }

  return res.status(401).json({ message: "Unauthorized" });
};

export const login: RequestHandler = authorization(loginHandler, {
  skipJwtAuth: true,
});
