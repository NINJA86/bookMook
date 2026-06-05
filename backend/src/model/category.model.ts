import { Schema, model } from 'mongoose';
import { ICategory } from '../lib/data';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<ICategory>('Category', categorySchema);
