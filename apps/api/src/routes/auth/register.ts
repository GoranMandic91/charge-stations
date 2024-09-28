import Joi from "joi";
import { RequestHandler } from "express";
import { authorization } from "../../middleware/authorization";
import { validate } from "../../utils/validate";
import { findOne } from "../../collections/users/findOne";
import { insertOne } from "../../collections/users/insertOne";

export const addUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").required(),
});

export const registerHandler: RequestHandler = async (req, res) => {
  const { value, error } = validate(addUserSchema, req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Invalid request: ${error.details[0].message}` });
  }

  try {
    const user = await insertOne(value);
    return res.status(201).json({ user });
  } catch (error: any) {
    if (error.message === "duplicate-user") {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

export const register: RequestHandler = authorization(registerHandler, {
  skipJwtAuth: true,
});
