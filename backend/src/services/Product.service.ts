import { ModelStatic } from 'sequelize';
import ProductModel from '../database/models/ProductModel';
import { BadRequest, Conflict } from '../errors';
import { validateSalesPrice, validateNewProduct } from './validations/validationInputValues';
import { IProduct } from '../interfaces/ProductInterface';
import handleProductPrice from '../utils';

class ProductService {
  private productModel: ModelStatic<ProductModel>;

  constructor() {
    this.productModel = ProductModel;
  }

  public async findAll(): Promise<ProductModel[]> {
    const products = await this.productModel.findAll();

    return products;
  }

  public async findByCode(code: number): Promise<ProductModel | null> {
    const product = await this.productModel.findOne({
      where: { code },
    });

    return product;
  }

  public async create(productInfo: IProduct): Promise<ProductModel> {
    validateNewProduct(productInfo);

    const {
      code, name, costPrice, salesPrice,
    } = productInfo;

    const checkCode = await this.findByCode(code);

    if (checkCode) throw new Conflict('Product code already exists!');

    if (costPrice > salesPrice) throw new BadRequest('Invalid sales price!');

    const newProduct = await this.productModel.create({
      code, name, costPrice, salesPrice,
    });

    return newProduct;
  }

  public async updatePrice(code: number, newPrice: number): Promise<void> {
    validateSalesPrice(newPrice);

    const checkCode = await this.findByCode(code);

    if (!checkCode) throw new Conflict('Product does not exist!');

    if (checkCode.costPrice > newPrice) throw new BadRequest('Invalid sales price!');

    if (!handleProductPrice(checkCode.salesPrice, newPrice)) throw new BadRequest('Invalid sales price!');

    await this.productModel.update(
      { salesPrice: newPrice },
      { where: { code } },
    );
  }

  public async deleteProduct(code: number): Promise<void> {
    const checkCode = await this.findByCode(code);

    if (!checkCode) throw new Conflict('Product does not exist!');

    await this.productModel.destroy({
      where: { code },
    });
  }
}

export default ProductService;
