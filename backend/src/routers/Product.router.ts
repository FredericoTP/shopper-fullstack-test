import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { ProductController } from '../constrollers';
import { validateNewProduct, validateUpdateProduct } from '../middlewares';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', (req: Request, res: Response) => productController.findAll(req, res));

productRouter.get('/:id', (req: Request, res: Response) => productController.findByCode(req, res));

productRouter.post('/', validateNewProduct, (req: Request, res: Response) => productController.create(req, res));

productRouter.patch('/', validateUpdateProduct, (req: Request, res: Response) => productController.updatePrice(req, res));

productRouter.delete('/:id', (req: Request, res: Response) => productController.deleteProduct(req, res));

export default productRouter;
