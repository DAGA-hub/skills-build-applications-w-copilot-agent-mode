import express from "express";
import User from "./models/user.ts";
import Team from "./models/team.ts";
import Activity from "./models/activity.ts";
import Workout from "./models/workout.ts";
import Leaderboard from "./models/leaderboard.ts";
import { connectDB } from "./config/database.ts";

const app = express();
const port = 8000;

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

app.post("/init-populate-octofit_db", async (_req, res) => {
  try {
    // Dynamically import the seed module so it can be called at runtime
    const mod = await import("./scripts/seed.ts");
    const seed = mod.default ?? mod.seed;
    if (typeof seed !== "function") {
      return res.status(500).json({ error: "Seed function not found" });
    }

    await seed();
    return res.json({ status: "ok", message: "Database seeded" });
  } catch (err) {
    console.error("Seed route failed:", err);
    return res.status(500).json({ error: String(err) });
  }
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
