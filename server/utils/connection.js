import mongoose from "mongoose";
 import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection URI from environment variables
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URI );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
