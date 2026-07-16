import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';
export class Category extends Model {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    modelName: 'Category',
    sequelize,
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  },
);
