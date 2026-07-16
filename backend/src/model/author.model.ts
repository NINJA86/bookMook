import { Schema, model } from 'mongoose';
import { IAuthor } from '../lib/data';
import sequelize from '../lib/db';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export class Author extends Model<
  InferAttributes<Author, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<Author, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: number;
  declare name: string;
  declare bio: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Author.init(
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: 'Author',
    sequelize,
    tableName: 'authors',
    timestamps: true,
    underscored: true,
  },
);
