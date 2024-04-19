import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { ProductService } from '../../services';
import { ProductController } from '../../constrollers';
import ProductModel from '../../database/models/ProductModel';
import {
  allProducts, newProduct, oneProduct, updateProduct,
} from './mocks/mockProduct';
import { NotFound } from '../../errors';

chai.use(sinonChai);

const { expect } = chai;

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
    productService = new ProductService();
    productController = new ProductController(productService);
  });

  describe('Testing findAll method', () => {
    it('Succesfully returns all products', async () => {
      sinon.stub(productService, 'findAll').resolves(allProducts as ProductModel[]);

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('Testing findByCode method', () => {
    it('Should throw an error if product does not exist', async () => {
      sinon.stub(productService, 'findByCode').resolves(null);
      req.params = {
        id: '10',
      };
      let error = new Error();

      try {
        await productController.findByCode(req, res);
      } catch (err) {
        error = err as Error;
      }

      expect(error).to.be.instanceOf(NotFound);
      expect(error.message).to.be.equal('Product not found!');
    });

    it('Succesfully returns a product', async () => {
      sinon.stub(productService, 'findByCode').resolves(oneProduct as ProductModel);
      req.params = {
        id: '10',
      };

      await productController.findByCode(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(oneProduct);
    });
  });

  describe('Testing create method', () => {
    it('Successfully creates a product', async () => {
      sinon.stub(productService, 'create').resolves(oneProduct as ProductModel);
      req.body = newProduct;

      await productController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(oneProduct);
    });
  });

  describe('Testing updatePrice method', () => {
    it('Successfully updates a product', async () => {
      sinon.stub(productService, 'updatePrice').resolves();
      req.body = updateProduct;

      await productController.updatePrice(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product has been updated!' });
    });
  });

  describe('Testing deleteProduct method', () => {
    it('Successfully deletes a product', async () => {
      sinon.stub(productService, 'deleteProduct').resolves();
      req.params = {
        id: '10',
      };

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product has been deleted!' });
    });
  });
});
