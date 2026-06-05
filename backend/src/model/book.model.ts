import { Schema, model } from 'mongoose';
import { IBook } from '../lib/data';

const bookSchema = new Schema<IBook>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    page: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IBook>('Book', bookSchema);
