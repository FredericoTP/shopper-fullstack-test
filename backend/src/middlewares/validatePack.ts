import { Request, Response, NextFunction } from 'express';
import { IPack } from '../interfaces/PackInterface';

const validateNewPack = (req: Request, res: Response, next: NextFunction) => {
  const packInfo: IPack = req.body;
  const { packId, productId, qty } = packInfo;

  if (!packId) return res.status(400).json({ message: 'packId is a required field' });

  if (!productId) return res.status(400).json({ message: 'productId is a required field' });

  if (!qty) return res.status(400).json({ message: 'qty is a required field' });

  return next();
};

export default validateNewPack;
