import mongoose from 'mongoose';

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGO_URI as string);
}

export default connectDB;