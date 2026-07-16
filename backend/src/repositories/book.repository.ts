import { Includeable, IncludeOptions, WhereOptions } from 'sequelize';
import { Book } from '../model';

export const findBooks = async (
  where?: WhereOptions,
  include?: Includeable | Includeable[],
) => {
  const condition = { where: where || {}, ...(include && { include }) };

  return await Book.findAll(condition);
};

export const findBook = async (
  where: WhereOptions,
  include?: Includeable | Includeable[],
) => {
  const condition = { where, ...(include && { include }) };

  return await Book.findOne(condition);
};

export const findBookById = async (
  id: number,
  include?: Includeable | Includeable[],
) => {
  const relations = { ...(include && { include }) };

  return await Book.findByPk(id, relations);
};
