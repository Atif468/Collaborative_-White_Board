import mongoose from "mongoose";
 import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URI );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
