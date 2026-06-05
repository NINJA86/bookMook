import { Types } from 'mongoose';

export interface IBook {
  title: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  description: string;
  price: number;
  image: string;
  page: number;
  format: string;
  slug: string;
}

export interface IAuthor {
  name: string;
  bio: string;
}

export interface ICategory {
  name: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IComment {
  text: string;
  rating: number;
  user: Types.ObjectId;
  book: Types.ObjectId;
}
