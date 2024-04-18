interface IProduct {
  code: number;
  name: string;
  costPrice: number;
  salesPrice: number;
}

interface IUpdate {
  code: number;
  newPrice: number;
}

export {
  IProduct,
  IUpdate,
};
