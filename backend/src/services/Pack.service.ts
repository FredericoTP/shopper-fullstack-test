import { ModelStatic } from 'sequelize';
import PackModel from '../database/models/PackModel';
import ProductModel from '../database/models/ProductModel';
import { IPack } from '../interfaces/PackInterface';
import { Conflict } from '../errors';
import { validateNewPack, validatePackId, validateProductId } from './validations/validationInputValues';

class PackService {
  private packModel: ModelStatic<PackModel>;

  private productModel: ModelStatic<ProductModel>;

  constructor() {
    this.packModel = PackModel;
    this.productModel = ProductModel;
  }

  public async findAll(): Promise<PackModel[]> {
    const packs = await this.packModel.findAll();

    return packs;
  }

  public async findByPackId(packId: number): Promise<PackModel[]> {
    validatePackId(packId);

    const pack = await this.packModel.findAll({
      where: { packId },
    });

    return pack;
  }

  public async findByProductId(productId: number): Promise<PackModel[]> {
    validateProductId(productId);

    const pack = await this.packModel.findAll({
      where: { productId },
    });

    return pack;
  }

  public async create(packInfo: IPack): Promise<PackModel> {
    validateNewPack(packInfo);

    const { packId, productId, qty } = packInfo;

    const checkPackId = await this.productModel.findOne({
      where: { code: packId },
    });

    if (!checkPackId) throw new Conflict('pack does not exist!');

    const checkProductId = await this.productModel.findOne({
      where: { code: productId },
    });

    if (!checkProductId) throw new Conflict('product does not exist!');

    const newPack = await this.packModel.create({
      packId, productId, qty,
    });

    return newPack;
  }

  public async deletePack(packId: number): Promise<void> {
    validatePackId(packId);

    const checkPack = await this.findByPackId(packId);

    if (checkPack.length === 0) throw new Conflict('Pack does not exist!');

    await this.packModel.destroy({
      where: { packId },
    });
  }
}

export default PackService;
