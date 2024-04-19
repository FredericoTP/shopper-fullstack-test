const allPacks = [
  {
    id: 1,
    packId: 1000,
    productId: 18,
    qty: 6,
  },
  {
    id: 2,
    packId: 1010,
    productId: 24,
    qty: 1,
  },
];

const allById = [
  {
    id: 1,
    packId: 1000,
    productId: 18,
    qty: 6,
  },
];

const invalidCreate = {
  packId: -1,
  productId: -1,
  qty: -1,
};

const newPack = {
  packId: 1000,
  productId: 18,
  qty: 7,
};

const createdPack = {
  id: 1,
  packId: 1000,
  productId: 18,
  qty: 7,
};

export {
  allPacks,
  allById,
  invalidCreate,
  newPack,
  createdPack,
};
