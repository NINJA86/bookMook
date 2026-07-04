import { Schema, model } from 'mongoose';
import { IAuthor } from '../lib/data';

const authorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IAuthor>('Author', authorSchema);
