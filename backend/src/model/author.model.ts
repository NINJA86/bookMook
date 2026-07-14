import { Schema, model } from 'mongoose';
import { IAuthor } from '../lib/data';
import sequelize from '../lib/db';
import { DataTypes, Model } from 'sequelize';

export class Author extends Model {
  declare id: number;
  declare name: string;
  declare bio: string;
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
