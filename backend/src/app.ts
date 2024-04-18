import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from './errors';
import { productRouter, packRouter } from './routers';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.status(200).send('Server on and healthy!'));

app.use('/product', productRouter);

app.use('/pack', packRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error!' });
});

export default app;
