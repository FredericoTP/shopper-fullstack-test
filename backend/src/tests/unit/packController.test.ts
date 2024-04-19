import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { PackService } from '../../services';
import { PackController } from '../../constrollers';
import PackModel from '../../database/models/PackModel';
import {
  allById, allPacks, createdPack, newPack,
} from './mocks/mockPacks';

chai.use(sinonChai);

const { expect } = chai;

describe('PackController', () => {
  let packController: PackController;
  let packService: PackService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    packService = new PackService();
    packController = new PackController(packService);
  });

  describe('Testing findAll method', () => {
    it('Succesfully returns all packs', async () => {
      sinon.stub(packService, 'findAll').resolves(allPacks as PackModel[]);

      await packController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allPacks);
    });
  });

  describe('Testing findByPackId method', () => {
    it('Succesfully returns all packs by packId', async () => {
      sinon.stub(packService, 'findByPackId').resolves(allById as PackModel[]);
      req.params = {
        id: '1',
      };

      await packController.findByPackId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allById);
    });
  });

  describe('Testing findByProductId method', () => {
    it('Succesfully returns all packs by productId', async () => {
      sinon.stub(packService, 'findByProductId').resolves(allById as PackModel[]);
      req.params = {
        id: '1',
      };

      await packController.findByProductId(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allById);
    });
  });

  describe('Testing create method', () => {
    it('Succesfully returns all packs by productId', async () => {
      sinon.stub(packService, 'create').resolves(createdPack as PackModel);
      req.body = newPack;

      await packController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdPack);
    });
  });

  describe('Testing deletePack method', () => {
    it('Succesfully returns all packs by productId', async () => {
      const stub = sinon.stub(packService, 'deletePack').resolves();
      req.params = {
        id: '1',
      };

      await packController.deletePack(req, res);

      sinon.assert.callCount(stub, 1);
    });
  });
});
