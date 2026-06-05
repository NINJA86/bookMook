import { Schema } from 'mongoose';
import { IComment } from '../lib/data';

const commentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
