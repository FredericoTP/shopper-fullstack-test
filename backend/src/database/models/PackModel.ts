import { Model, BIGINT } from 'sequelize';
import ProductModel from './ProductModel';
import db from '.';

class PackModel extends Model {
  declare id: number;

  declare packId: number;

  declare productId: number;

  declare qty: number;
}

PackModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: BIGINT,
    },
    packId: {
      allowNull: false,
      type: BIGINT,
    },
    productId: {
      allowNull: false,
      type: BIGINT,
    },
    qty: {
      allowNull: false,
      type: BIGINT,
    },
  },
  {
    sequelize: db,
    modelName: 'packs',
    timestamps: false,
    underscored: true,
  },
);

PackModel.belongsTo(ProductModel, { foreignKey: 'packId', as: 'pack' });
PackModel.belongsTo(ProductModel, { foreignKey: 'productId', as: 'product' });

export default PackModel;
