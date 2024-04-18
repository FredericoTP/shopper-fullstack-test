import { Request, Response, NextFunction } from 'express';
import { IProduct, IUpdate } from '../interfaces/ProductInterface';

const validateNewProduct = (req: Request, res: Response, next: NextFunction) => {
  const productInfo: IProduct = req.body;
  const {
    code, name, costPrice, salesPrice,
  } = productInfo;

  if (!code) return res.status(400).json({ message: 'code is a required field' });

  if (!name) return res.status(400).json({ message: 'name is a required field' });

  if (!costPrice) return res.status(400).json({ message: 'costPrice is a required field' });

  if (!salesPrice) return res.status(400).json({ message: 'salesPrice is a required field' });

  return next();
};

const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const updateInfo: IUpdate = req.body;
  const { code, newPrice } = updateInfo;

  if (!code) return res.status(400).json({ message: 'code is a required field' });

  if (!newPrice) return res.status(400).json({ message: 'newPrice is a required field' });

  return next();
};

export {
  validateNewProduct,
  validateUpdateProduct,
};
