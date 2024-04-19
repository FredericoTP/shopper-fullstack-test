const allProducts = [{
  dataValues: [{
    code: 10,
    name: 'PRODUTO 1',
    costPrice: 8.59,
    salesPrice: 10.20,
  },
  {
    code: 11,
    name: 'PRODUTO 2',
    costPrice: 5.04,
    salesPrice: 7.30,
  }],
}];

const oneProduct = {
  code: 10,
  name: 'PRODUTO 1',
  costPrice: 8.59,
  salesPrice: 10.20,
};

const emptyParams = {
  code: 0,
  name: '',
  costPrice: 0,
  salesPrice: 0,
};

const newProduct = {
  code: 10,
  name: 'PRODUTO 1',
  costPrice: 8.59,
  salesPrice: 10.20,
};

const invalidProduct = {
  code: 10,
  name: 'PRODUTO 1',
  costPrice: 8.59,
  salesPrice: 2.00,
};

const updateProduct = {
  code: 10,
  newPrice: 8.50,
};

export {
  allProducts,
  oneProduct,
  emptyParams,
  newProduct,
  invalidProduct,
  updateProduct,
};
