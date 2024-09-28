import Joi from "joi";
import { RequestHandler } from "express";

import { validate } from "../../utils/validate";
import { authorization } from "../../middleware/authorization";
import { insertOne } from "../../collections/offices/insertOne";

export const addOfficeSchema = Joi.object().keys({
  name: Joi.string().required(),
  location: Joi.string().required(),
  highDemandDuration: Joi.string().required(),
  numOfChargers: Joi.number().min(1).required(),
});

const postOfficeHandler: RequestHandler = async (req, res) => {
  const { value, error } = validate(addOfficeSchema, req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Invalid request: ${error.details[0].message}` });
  }

  try {
    const office = await insertOne(value);
    return res.status(200).json({ office });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const postOffice: RequestHandler = authorization(postOfficeHandler, {
  checkRole: "admin",
});
