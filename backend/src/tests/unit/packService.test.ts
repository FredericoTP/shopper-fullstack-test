import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { PackService } from '../../services';
import PackModel from '../../database/models/PackModel';
import ProductModel from '../../database/models/ProductModel';
import { BadRequest, Conflict } from '../../errors';
import {
  allById, allPacks, createdPack, invalidCreate, newPack,
} from './mocks/mockPacks';
import { oneProduct } from './mocks/mockProduct';

chai.use(sinonChai);

const { expect } = chai;

describe('PackService', () => {
  let packService: PackService;

  beforeEach(() => {
    packService = new PackService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing findAll method', () => {
    it('Succesfully returns all packs', async () => {
      sinon.stub(PackModel, 'findAll').resolves(allPacks as PackModel[]);

      const packs = await packService.findAll();

      expect(packs).to.be.deep.equal(allPacks);
    });
  });

  describe('Testing findByPackId method', () => {
    it('Should throw an error if packId is invalid', async () => {
      let error = new Error();

      try {
        await packService.findByPackId(-1);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"value" must be greater than or equal to 0');
    });

    it('Succesfully returns all packs', async () => {
      sinon.stub(PackModel, 'findAll').resolves(allById as PackModel[]);

      const packs = await packService.findByPackId(1);

      expect(packs).to.be.deep.equal(allById);
    });
  });

  describe('Testing findByProductId method', () => {
    it('Should throw an error if productId is invalid', async () => {
      let error = new Error();

      try {
        await packService.findByProductId(-1);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"value" must be greater than or equal to 0');
    });

    it('Succesfully returns all packs', async () => {
      sinon.stub(PackModel, 'findAll').resolves(allById as PackModel[]);

      const packs = await packService.findByProductId(1);

      expect(packs).to.be.deep.equal(allById);
    });
  });

  describe('Testing create method', () => {
    it('Should throw an error if some field is invalid', async () => {
      let error = new Error();

      try {
        await packService.create(invalidCreate);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"packId" must be greater than or equal to 0');
    });

    it('Should throw an error if packId does not exist', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await packService.create(newPack);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('pack does not exist!');
    });

    it('Should throw an error if productId does not exist', async () => {
      sinon.stub(ProductModel, 'findOne')
        .onFirstCall()
        .resolves(oneProduct as ProductModel)
        .onSecondCall()
        .resolves(null);
      let error = new Error();

      try {
        await packService.create(newPack);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('product does not exist!');
    });

    it('Successfully creates a new pack', async () => {
      sinon.stub(ProductModel, 'findOne')
        .onFirstCall()
        .resolves(oneProduct as ProductModel)
        .onSecondCall()
        .resolves(oneProduct as ProductModel);
      sinon.stub(PackModel, 'create').resolves(createdPack as PackModel);

      const pack = await packService.create(newPack);

      expect(pack).to.be.deep.equal(createdPack);
    });
  });

  describe('Testing deletePack method', () => {
    it('Should throw an error if packId is invalid', async () => {
      let error = new Error();

      try {
        await packService.deletePack(-1);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"value" must be greater than or equal to 0');
    });

    it('Should throw an error if pack does not exist', async () => {
      sinon.stub(PackModel, 'findAll').resolves([]);
      let error = new Error();

      try {
        await packService.deletePack(1);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Pack does not exist!');
    });

    it('Succesfully deletes a pack', async () => {
      sinon.stub(PackModel, 'findAll').resolves(allById as PackModel[]);
      const stub = sinon.stub(PackModel, 'destroy').resolves();

      await packService.deletePack(1);

      sinon.assert.callCount(stub, 1);
    });
  });
});
