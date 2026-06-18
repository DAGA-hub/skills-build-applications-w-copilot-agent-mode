import mongoose from "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  role: "member" | "coach" | "admin";
  joinedAt: Date;
  team?: mongoose.Types.ObjectId;
  activeGoal: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "member" },
    joinedAt: { type: Date, required: true, default: () => new Date() },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    activeGoal: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
