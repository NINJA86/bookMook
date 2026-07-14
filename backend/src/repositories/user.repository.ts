import { QueryTypes, WhereOptions } from 'sequelize';
import { CreateUserInput } from '../lib/data';
import sequelize from '../lib/db';
import { User } from '../model/user.model';

export const createUser = async (input: CreateUserInput) => {
  return User.create(input);
};
export const findUser = async (
  where: WhereOptions<User>,
): Promise<User | null> => {
  const condition = { where };
  return await User.findOne(condition);
};

export const findAndUpdateUser = async (
  where: WhereOptions<User>,
  values: Partial<User>,
): Promise<User | null> => {
  const condition = { where };
  await User.update(values, condition);
  return await User.findOne(condition);
};

export const updateUser = async (
  where: WhereOptions<User>,
  values: Partial<User>,
): Promise<[affectedCount: number]> => {
  const condition = { where };
  return await User.update(values, condition);
};
