import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

export async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  }
}

export function getMongoose() {
  return mongoose;
}

export default connectDB;
