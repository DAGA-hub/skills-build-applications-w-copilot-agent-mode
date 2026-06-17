import mongoose from "mongoose";

export interface LeaderboardDocument {
  team: mongoose.Types.ObjectId;
  rank: number;
  points: number;
  updatedAt: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    updatedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<LeaderboardDocument>("Leaderboard", leaderboardSchema);
export default Leaderboard;
