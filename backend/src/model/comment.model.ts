import { Schema } from 'mongoose';
import { IComment } from '../lib/data';
import { model } from 'mongoose';

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
    avatar: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IComment>('Comment', commentSchema);
