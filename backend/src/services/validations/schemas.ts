import Joi, { NumberSchema, StringSchema, ObjectSchema } from 'joi';

const customMessage = (fieldName: string, min: number, type: string) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const codeSchema: NumberSchema = Joi.number().integer().min(0).required()
  .messages(customMessage('code', 0, 'number'));

const nameSchema: StringSchema = Joi.string().min(3).required().messages(customMessage('name', 3, 'string'));

const costPriceSchema: NumberSchema = Joi.number().precision(2).min(0).required()
  .messages(customMessage('costPrice', 0, 'number'));

const salesPriceSchema: NumberSchema = Joi.number().precision(2).min(0).required()
  .messages(customMessage('salesPrice', 0, 'number'));

const productSchema: ObjectSchema = Joi.object({
  code: codeSchema,
  name: nameSchema,
  costPrice: costPriceSchema,
  salesPrice: salesPriceSchema,
});

const productIdSchema: NumberSchema = Joi.number().integer().min(0).required()
  .messages(customMessage('productId', 0, 'number'));

const packIdSchema: NumberSchema = Joi.number().integer().min(0).required()
  .messages(customMessage('packId', 0, 'number'));

const qtySchema: NumberSchema = Joi.number().integer().min(1).required()
  .messages(customMessage('qty', 1, 'number'));

const packSchema: ObjectSchema = Joi.object({
  packId: packIdSchema,
  productId: productIdSchema,
  qty: qtySchema,
});

export {
  codeSchema,
  nameSchema,
  costPriceSchema,
  salesPriceSchema,
  productSchema,
  productIdSchema,
  packIdSchema,
  qtySchema,
  packSchema,
};
