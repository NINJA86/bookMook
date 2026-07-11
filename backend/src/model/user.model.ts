import {
  Model,
  DataTypes as Types,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../lib/db';

export class User extends Model<
  InferAttributes<User, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<User, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare phone_number: string;
  declare password: string;
  declare refresh_token: string | null;
  declare reset_code: string | null;
  declare reset_code_expires_at: Date | null;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: Types.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Types.STRING(100),
      allowNull: false,
    },

    email: {
      type: Types.STRING(150),
      allowNull: false,
      
      unique: true,
    },

    phone_number: {
      type: Types.STRING(20),
      unique: true,
      allowNull: false,
    },

    password: {
      type: Types.STRING(255),
      allowNull: false,
    },

    refresh_token: {
      type: Types.TEXT,
      allowNull: true,
    },

    reset_code: {
      type: Types.STRING(20),
      allowNull: true,
    },

    reset_code_expires_at: {
      type: Types.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);

