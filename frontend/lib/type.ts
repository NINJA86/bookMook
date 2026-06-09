import { Types } from 'mongoose';

/* -------------------- BASE -------------------- */

export interface IAuthor {
  _id: string;
  name: string;
  bio: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IComment {
  _id: string;
  text: string;
  rating: number;
  avatar: string;
  location: string;

  user: Types.ObjectId;
  book: Types.ObjectId;
}

/* -------------------- DATABASE -------------------- */

export interface IBook {
  _id: string;

  title: string;
  description: string;
  price: number;
  image: string;

  page: number;
  format: string;

  slug: string;
  rating: number;

  author: Types.ObjectId;
  category: Types.ObjectId;
  tags: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentDb {
  _id: string;

  text: string;
  rating: number;
  avatar: string;
  location: string;

  user: Types.ObjectId;
  book: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

/* -------------------- POPULATED -------------------- */

export interface IBookPopulated {
  _id: string;

  title: string;
  description: string;
  price: number;
  image: string;

  page: number;
  format: string;

  slug: string;
  rating: number;

  author: IAuthor;
  category: ICategory;
  tags: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentPopulated {
  _id: string;

  text: string;
  rating: number;
  avatar: string;
  location: string;

  user: IUser;
  book: IBookPopulated;

  createdAt?: Date;
  updatedAt?: Date;
}

/* -------------------------- input --------------------- */

export interface ICommentInput {
  _id: string;

  text: string;
  rating: number;
  avatar: string;
  location: string;

  user: string;
  book: string;
}
