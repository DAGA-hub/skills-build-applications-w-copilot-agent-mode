import mongoose from "mongoose";

export interface TeamDocument {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  score: number;
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    score: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const Team = mongoose.model<TeamDocument>("Team", teamSchema);
export default Team;
