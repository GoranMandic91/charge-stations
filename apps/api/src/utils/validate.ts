import Joi from "joi";

type Validate = (
  schema: Joi.ObjectSchema,
  value: any
) => ReturnType<Joi.AnySchema["validate"]>;

export const validate: Validate = (schema, value) =>
  schema.validate(value, {
    allowUnknown: true,
    stripUnknown: true,
  });
