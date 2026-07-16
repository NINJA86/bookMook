import { CreationAttributes, Includeable, WhereOptions } from 'sequelize';
import { Comment } from '../model';

export const findComments = async (
  where?: WhereOptions,
  include?: Includeable | Includeable[],
) => {
  const condition = { where: where || {}, ...(include && { include }) };

  return await Comment.findAll(condition);
};

export const findComment = async (
  where: WhereOptions,
  include?: Includeable | Includeable[],
) => {
  const condition = { where, ...(include && { include }) };

  return await Comment.findOne(condition);
};

export const findCommentById = async (
  id: number,
  include?: Includeable | Includeable[],
) => {
  const relations = { ...(include && { include }) };
  return await Comment.findByPk(id, relations);
};

export const addComment = async (value: CreationAttributes<Comment>) => {
  return await Comment.create(value);
};
