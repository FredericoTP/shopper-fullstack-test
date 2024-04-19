import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ProductService } from '../../services';
import ProductModel from '../../database/models/ProductModel';
import { BadRequest, Conflict } from '../../errors';
import {
  allProducts, oneProduct, emptyParams, newProduct,
  invalidProduct,
} from './mocks/mockProduct';

chai.use(sinonChai);

const { expect } = chai;

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Testing findAll method', () => {
    it('Should return all products', async () => {
      sinon.stub(ProductModel, 'findAll').resolves(allProducts as ProductModel[]);

      const products = await productService.findAll();

      expect(products).to.be.deep.equal(allProducts);
    });
  });

  describe('Testing findByCode method', () => {
    it('Should return null if product does not exist', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);

      const products = await productService.findByCode(1);

      expect(products).to.be.equal(null);
    });

    it('Should return one product', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);

      const products = await productService.findByCode(1);

      expect(products).to.be.deep.equal(oneProduct);
    });
  });

  describe('Testing create method', () => {
    it('Should throw an error when a field is empty', async () => {
      let error = new Error();

      try {
        await productService.create(emptyParams);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Should throw an error if product already exists', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      let error = new Error();

      try {
        await productService.create(newProduct);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Product code already exists!');
    });

    it('Should throw an error if costPrice > salesPrice', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await productService.create(invalidProduct);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Invalid sales price!');
    });

    it('Successfully creates a product', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);
      sinon.stub(ProductModel, 'create').resolves(oneProduct as ProductModel);

      const product = await productService.create(newProduct);

      expect(product).to.be.deep.equal(product);
    });
  });

  describe('Testing updatePrice method', () => {
    it('Should throw an error if newPrice is wrong', async () => {
      let error = new Error();

      try {
        await productService.updatePrice(1, -2);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('"value" must be greater than or equal to 0');
    });

    it('Should throw an error if product doe not exist', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await productService.updatePrice(1, 3);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Product does not exist!');
    });

    it('Should throw an error if newPrice < costPrice', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      let error = new Error();

      try {
        await productService.updatePrice(10, 3);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Invalid sales price!');
    });

    it('Should throw an error if the newPrice is more than 10% lower than the old salesPrice', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      let error = new Error();

      try {
        await productService.updatePrice(10, 9.17);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Invalid sales price!');
    });

    it('Should throw an error if the newPrice is more than 10% bigger than the old salesPrice', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      let error = new Error();

      try {
        await productService.updatePrice(10, 11.23);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Invalid sales price!');
    });

    it('Successfully updates a product', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      const stub = sinon.stub(ProductModel, 'update').resolves();

      await productService.updatePrice(oneProduct.code, oneProduct.salesPrice * 1.05);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing deleteProduct method', () => {
    it('Should throw an error if product does not exist', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(null);
      let error = new Error();

      try {
        await productService.deleteProduct(10);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Product does not exist!');
    });

    it('Succesfully deletes a product', async () => {
      sinon.stub(ProductModel, 'findOne').resolves(oneProduct as ProductModel);
      const stub = sinon.stub(ProductModel, 'destroy').resolves();

      await productService.deleteProduct(10);

      sinon.assert.callCount(stub, 1);
    });
  });
});
