import {
  codeSchema, packIdSchema, packSchema, productIdSchema, productSchema, salesPriceSchema,
} from './schemas';
import { BadRequest } from '../../errors';
import { IProduct } from '../../interfaces/ProductInterface';
import { IPack } from '../../interfaces/PackInterface';

const validateCode = (code: number): void => {
  const { error } = codeSchema.validate(code);

  if (error) throw new BadRequest(error.message);
};

const validateSalesPrice = (salesPrice: number): void => {
  const { error } = salesPriceSchema.validate(salesPrice);

  if (error) throw new BadRequest(error.message);
};

const validateNewProduct = (productInfo: IProduct):void => {
  const { error } = productSchema.validate(productInfo);

  if (error) throw new BadRequest(error.message);
};

const validateNewPack = (packInfo: IPack): void => {
  const { error } = packSchema.validate(packInfo);

  if (error) throw new BadRequest(error.message);
};

const validatePackId = (packId: number): void => {
  const { error } = packIdSchema.validate(packId);

  if (error) throw new BadRequest(error.message);
};

const validateProductId = (productId: number): void => {
  const { error } = productIdSchema.validate(productId);

  if (error) throw new BadRequest(error.message);
};

export {
  validateCode,
  validateSalesPrice,
  validateNewProduct,
  validateNewPack,
  validatePackId,
  validateProductId,
};
