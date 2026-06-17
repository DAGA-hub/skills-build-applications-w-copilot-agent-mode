import express from "express";
import mongoose from "mongoose";
import User from "./models/user.ts";
import Team from "./models/team.ts";
import Activity from "./models/activity.ts";
import Workout from "./models/workout.ts";
import Leaderboard from "./models/leaderboard.ts";

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit_db";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "OctoFit Tracker API is running" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", async (_req, res) => {
  const users = await User.find().populate("team").lean();
  res.json(users);
});

app.get("/teams", async (_req, res) => {
  const teams = await Team.find().populate("members").lean();
  res.json(teams);
});

app.get("/activities", async (_req, res) => {
  const activities = await Activity.find().populate("user team").lean();
  res.json(activities);
});

app.get("/workouts", async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.get("/leaderboard", async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate("team").sort({ rank: 1 }).lean();
  res.json(leaderboard);
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
