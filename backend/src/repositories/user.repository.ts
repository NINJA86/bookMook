import { QueryTypes, WhereOptions } from 'sequelize';
import { CreateUserInput } from '../lib/data';
import sequelize from '../lib/db';
import { User } from '../model/user.model';

export const createUser = async (input: CreateUserInput) => {
  const { name, email, password, phone_number, refresh_token } = input;
  return User.create(input)
};
export const findUser = async (
  where: WhereOptions<User>,
): Promise<User | null> => {
  User;
  return await User.findOne({ where });
};
