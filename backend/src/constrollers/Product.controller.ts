import { Request, Response } from 'express';
import { ProductService } from '../services';
import { IProduct, IUpdate } from '../interfaces/ProductInterface';
import { NotFound } from '../errors';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const products = await this.productService.findAll();

    return res.status(200).json(products);
  }

  public async findByCode(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const product = await this.productService.findByCode(+id);

    if (!product) throw new NotFound('Product not found!');

    return res.status(200).json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const productInfo: IProduct = req.body;

    const newProduct = await this.productService.create(productInfo);

    return res.status(201).json(newProduct);
  }

  public async updatePrice(req: Request, res: Response): Promise<Response> {
    const updateInfo: IUpdate = req.body;
    const { code, newPrice } = updateInfo;

    await this.productService.updatePrice(code, newPrice);

    return res.status(200).json({ message: 'Product has been updated!' });
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.productService.deleteProduct(+id);

    return res.status(200).json({ message: 'Product has been deleted!' });
  }
}

export default ProductController;
