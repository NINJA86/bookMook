import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
