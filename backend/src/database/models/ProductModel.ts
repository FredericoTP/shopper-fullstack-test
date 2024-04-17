import {
  Model, STRING, BIGINT, DECIMAL,
} from 'sequelize';
import db from '.';

class ProductModel extends Model {
  declare code: number;

  declare name: string;

  declare costPrice: number;

  declare salesPrice: number;
}

ProductModel.init(
  {
    code: {
      allowNull: false,
      primaryKey: true,
      type: BIGINT,
    },
    name: {
      allowNull: false,
      type: STRING,
    },
    costPrice: {
      allowNull: false,
      type: DECIMAL(9, 2),
    },
    salesPrice: {
      allowNull: false,
      type: DECIMAL(9, 2),
    },
  },
  {
    sequelize: db,
    modelName: 'products',
    timestamps: false,
    underscored: true,
  },
);

export default ProductModel;
