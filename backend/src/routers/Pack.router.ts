import 'express-async-errors';
import { Request, Response, Router } from 'express';
import { PackController } from '../constrollers';
import { validateNewPack } from '../middlewares';

const packRouter = Router();
const packController = new PackController();

packRouter.get('/', (req: Request, res: Response) => packController.findAll(req, res));

packRouter.get('/pack/:id', (req: Request, res: Response) => packController.findByPackId(req, res));

packRouter.get('/product/:id', (req: Request, res: Response) => packController.findByProductId(req, res));

packRouter.post('/', validateNewPack, (req: Request, res: Response) => packController.create(req, res));

packRouter.delete('/', (req: Request, res: Response) => packController.deletePack(req, res));

export default packRouter;
