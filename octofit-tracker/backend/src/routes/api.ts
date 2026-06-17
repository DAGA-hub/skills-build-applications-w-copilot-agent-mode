import express from "express";
import User from "../models/user.ts";
import Team from "../models/team.ts";
import Activity from "../models/activity.ts";
import Workout from "../models/workout.ts";
import Leaderboard from "../models/leaderboard.ts";

const router = express.Router();

router.get("/users", async (_req, res) => {
  const users = await User.find().populate("team").lean();
  res.json(users);
});

router.get("/teams", async (_req, res) => {
  const teams = await Team.find().populate("members").lean();
  res.json(teams);
});

router.get("/activities", async (_req, res) => {
  const activities = await Activity.find().populate("user team").lean();
  res.json(activities);
});

router.get("/workouts", async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

router.get("/leaderboard", async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate("team").sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

export default router;
