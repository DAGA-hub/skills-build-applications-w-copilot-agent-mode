import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker API is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`);
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
