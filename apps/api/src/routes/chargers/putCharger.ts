import Joi from "joi";
import { RequestHandler } from "express";

import { validate } from "../../utils/validate";
import { authorization } from "../../middleware/authorization";
import { removeOne } from "../../collections/offices/removeOne";

export const updateChargerSchema = Joi.object().keys({
  user: Joi.object()
    .keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
    })
    .required(),
  officeId: Joi.string().required(),
  chargerId: Joi.number().min(1),
});

const patchChargerHandler: RequestHandler = async (req, res) => {
  const { value, error } = validate(updateChargerSchema, {
    ...req.body,
    ...req.params,
  });
  if (error) {
    return res
      .status(400)
      .json({ message: `Invalid request: ${error.details[0].message}` });
  }

  try {
    await removeOne(value);
    return res.status(201).json({});
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const patchCharger: RequestHandler = authorization(patchChargerHandler);
