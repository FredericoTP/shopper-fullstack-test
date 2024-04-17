import { codeSchema, productSchema, salesPriceSchema } from './schemas';
import { BadRequest } from '../../errors';
import { IProduct } from '../../interfaces/ProductInterface';

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

export {
  validateCode,
  validateSalesPrice,
  validateNewProduct,
};
