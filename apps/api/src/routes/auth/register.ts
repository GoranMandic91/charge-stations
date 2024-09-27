import Joi from "joi";
import { RequestHandler, Response, Send } from "express";
import { authorization } from "../../middleware/authorization";
import { validate } from "../../utils/validate";
import { database } from "../../database";
import { encrypt } from "../../utils/encrypt";

export const addUserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid("regular", "admin").required(),
});

export const registerHandler: RequestHandler = async (req, res) => {
  const { mongoClient } = database();

  const { value, error } = validate(addUserSchema, req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Invalid request: ${error.details[0].message}` });
  }

  try {
    const { email, password, firstName, lastName, role } = value;
    const inserted = await mongoClient()
      .db()
      .collection("users")
      .insertOne({
        email,
        password: encrypt(password),
        firstName,
        lastName,
        role,
      });

    const user = await mongoClient()
      .db()
      .collection("users")
      .findOne({ _id: inserted.insertedId });

    return res.status(201).json({ user });
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error")) {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

export const register: RequestHandler = authorization(registerHandler, {
  skipJwtAuth: true,
});
