import mongoose from "mongoose";

export interface ActivityDocument {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  performedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Activity = mongoose.model<ActivityDocument>("Activity", activitySchema);
export default Activity;
