import { Request, Response } from 'express';
import { PackService } from '../services';
import { IPack } from '../interfaces/PackInterface';

class PackController {
  constructor(private packService = new PackService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const products = await this.packService.findAll();

    return res.status(200).json(products);
  }

  public async findByPackId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const pack = await this.packService.findByPackId(+id);

    return res.status(200).json(pack);
  }

  public async findByProductId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const pack = await this.packService.findByProductId(+id);

    return res.status(200).json(pack);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const PackInfo: IPack = req.body;

    const newPack = await this.packService.create(PackInfo);

    return res.status(201).json(newPack);
  }

  public async deletePack(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.packService.deletePack(+id);

    return res.status(200).json({ message: 'Pack has been deleted!' });
  }

  public async verification(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    return res.status(200).json(body);
  }
}

export default PackController;
