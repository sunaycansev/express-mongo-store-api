import mongoose from "mongoose";

const connectDB = async (url) => {
  return await mongoose.connect(url);
};

export default connectDB;
