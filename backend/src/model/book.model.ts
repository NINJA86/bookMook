import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../lib/db';
export class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

export class Book_tag extends Model<
  InferAttributes<Book_tag>,
  InferCreationAttributes<Book_tag>
> {
  declare bookId: number;
  declare tagId: number;
}

export class Book extends Model<
  InferAttributes<Book, { omit: 'createdAt' | 'updatedAt' }>,
  InferCreationAttributes<Book, { omit: 'createdAt' | 'updatedAt' }>
> {
  declare id: CreationOptional<number>;

  declare title: string;
  declare slug: string;

  declare authorId: number;
  declare categoryId: number;

  declare description: string | null;

  declare price: number;

  declare image: string;

  declare page: number;

  declare format: string;

  declare rating: CreationOptional<number>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
    },

    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id',
      },
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    page: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    format: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    modelName: 'Book',
    sequelize,
    tableName: 'books',
    timestamps: true,
    underscored: true,
  },
);

Tag.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
  },
  { modelName: 'Tag', sequelize, timestamps: false, tableName: 'tags' },
);

Book_tag.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tags',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    modelName: 'Book_tag',
    sequelize,
    timestamps: false,
    tableName: 'book_tags',
    underscored: true,
  },
);
