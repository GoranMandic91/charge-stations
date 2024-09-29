import Joi from "joi";
import { RequestHandler } from "express";

import { validate } from "../../utils/validate";
import { authorization } from "../../middleware/authorization";
import { updateOne } from "../../collections/offices/updateOne";

export const bookChargerSchema = Joi.object().keys({
  userId: Joi.string().required(),
  officeId: Joi.string().required(),
  chargerId: Joi.number().min(1).required(),
});

const postChargerHandler: RequestHandler = async (req, res) => {
  const { value, error } = validate(bookChargerSchema, req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Invalid request: ${error.details[0].message}` });
  }

  try {
    await updateOne(value);
    return res.status(201).json({});
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const postCharger: RequestHandler = authorization(postChargerHandler);
