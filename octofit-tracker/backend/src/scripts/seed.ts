/**
 * Seed the octofit_db database with test data
 */
import { connectDB, getMongoose } from "../config/database.ts";
import User from "../models/user.ts";
import Team from "../models/team.ts";
import Activity from "../models/activity.ts";
import Workout from "../models/workout.ts";
import Leaderboard from "../models/leaderboard.ts";

export default async function seed() {
  console.log("Seed the octofit_db database with test data");

  const mongoose = getMongoose();
  const wasConnected = mongoose.connection.readyState === 1;
  if (!wasConnected) {
    await connectDB();
  }

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    {
      name: "Avery Chen",
      email: "avery.chen@example.com",
      role: "member",
      joinedAt: new Date("2026-01-14T09:15:00Z"),
      activeGoal: "Run 50 km this month",
    },
    {
      name: "Noah Patel",
      email: "noah.patel@example.com",
      role: "coach",
      joinedAt: new Date("2025-11-03T12:25:00Z"),
      activeGoal: "Help team improve weekly pace",
    },
    {
      name: "Mia Johnson",
      email: "mia.johnson@example.com",
      role: "member",
      joinedAt: new Date("2026-02-05T07:40:00Z"),
      activeGoal: "Complete 4 strength workouts per week",
    },
    {
      name: "Diego Ramirez",
      email: "diego.ramirez@example.com",
      role: "member",
      joinedAt: new Date("2026-03-18T16:00:00Z"),
      activeGoal: "Track daily calories burned",
    },
    {
      name: "Lena Brooks",
      email: "lena.brooks@example.com",
      role: "member",
      joinedAt: new Date("2026-04-06T14:20:00Z"),
      activeGoal: "Increase weekly yoga sessions",
    },
    {
      name: "Owen Wallace",
      email: "owen.wallace@example.com",
      role: "admin",
      joinedAt: new Date("2025-10-22T10:55:00Z"),
      activeGoal: "Review platform engagement metrics",
    },
  ]);

  const teamMap = {
    mavericks: new mongoose.Types.ObjectId(),
    sprinters: new mongoose.Types.ObjectId(),
    crushers: new mongoose.Types.ObjectId(),
  };

  const teams = await Team.create([
    {
      _id: teamMap.mavericks,
      name: "Marina Mavericks",
      description: "A high-energy crew focused on ocean runs and interval training.",
      members: [users[0]._id, users[2]._id],
      score: 1560,
    },
    {
      _id: teamMap.sprinters,
      name: "Sunrise Sprinters",
      description: "Morning runners who chase fast times and consistent pace.",
      members: [users[1]._id, users[3]._id],
      score: 1720,
    },
    {
      _id: teamMap.crushers,
      name: "Core Crushers",
      description: "Strength and conditioning team focused on functional workouts.",
      members: [users[4]._id, users[5]._id],
      score: 1485,
    },
  ]);

  await Promise.all([
    User.updateOne({ _id: users[0]._id }, { team: teamMap.mavericks }),
    User.updateOne({ _id: users[2]._id }, { team: teamMap.mavericks }),
    User.updateOne({ _id: users[1]._id }, { team: teamMap.sprinters }),
    User.updateOne({ _id: users[3]._id }, { team: teamMap.sprinters }),
    User.updateOne({ _id: users[4]._id }, { team: teamMap.crushers }),
    User.updateOne({ _id: users[5]._id }, { team: teamMap.crushers }),
  ]);

  const workouts = await Workout.create([
    {
      title: "Coastal Interval Run",
      description: "A fast-paced run with alternating sprint and recovery segments.",
      intensity: "High",
      durationMinutes: 45,
      targetMuscleGroups: ["Legs", "Core", "Cardio"],
    },
    {
      title: "Strength Circuit",
      description: "Bodyweight and kettlebell circuit for full-body strength.",
      intensity: "Medium",
      durationMinutes: 40,
      targetMuscleGroups: ["Core", "Upper Body", "Lower Body"],
    },
    {
      title: "Recovery Yoga Flow",
      description: "A gentle yoga flow to improve flexibility and mobility.",
      intensity: "Low",
      durationMinutes: 30,
      targetMuscleGroups: ["Flexibility", "Balance", "Core"],
    },
    {
      title: "Power Hill Climbs",
      description: "Hill repeats designed to build strength and endurance.",
      intensity: "High",
      durationMinutes: 50,
      targetMuscleGroups: ["Legs", "Glutes", "Cardio"],
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      team: teamMap.mavericks,
      type: "Trail Run",
      durationMinutes: 52,
      caloriesBurned: 620,
      distanceKm: 10.2,
      performedAt: new Date("2026-06-10T06:30:00Z"),
    },
    {
      user: users[2]._id,
      team: teamMap.mavericks,
      type: "Yoga Session",
      durationMinutes: 35,
      caloriesBurned: 180,
      performedAt: new Date("2026-06-11T18:45:00Z"),
    },
    {
      user: users[1]._id,
      team: teamMap.sprinters,
      type: "Interval Training",
      durationMinutes: 40,
      caloriesBurned: 520,
      distanceKm: 8.0,
      performedAt: new Date("2026-06-09T05:50:00Z"),
    },
    {
      user: users[3]._id,
      team: teamMap.sprinters,
      type: "Tempo Run",
      durationMinutes: 48,
      caloriesBurned: 560,
      distanceKm: 9.3,
      performedAt: new Date("2026-06-12T07:10:00Z"),
    },
    {
      user: users[4]._id,
      team: teamMap.crushers,
      type: "Strength Circuit",
      durationMinutes: 42,
      caloriesBurned: 430,
      performedAt: new Date("2026-06-11T17:20:00Z"),
    },
    {
      user: users[5]._id,
      team: teamMap.crushers,
      type: "Core Workout",
      durationMinutes: 38,
      caloriesBurned: 390,
      performedAt: new Date("2026-06-08T19:00:00Z"),
    },
  ]);

  await Leaderboard.create([
    {
      team: teamMap.sprinters,
      rank: 1,
      points: 1720,
    },
    {
      team: teamMap.mavericks,
      rank: 2,
      points: 1560,
    },
    {
      team: teamMap.crushers,
      rank: 3,
      points: 1485,
    },
  ]);

  console.log("Seed data inserted:");
  console.log(`  users=${users.length}`);
  console.log(`  teams=${teams.length}`);
  console.log(`  workouts=${workouts.length}`);
  console.log(`  activities=${activities.length}`);
  console.log("  leaderboard entries=3");

  if (!wasConnected) {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// If executed directly with node/ts-node, run the seed immediately
if (import.meta.url === `file://${process.argv[1]}`) {
  seed().catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
}
