import mongoose from "mongoose";

export interface WorkoutDocument {
  title: string;
  description: string;
  intensity: "Low" | "Medium" | "High";
  durationMinutes: number;
  targetMuscleGroups: string[];
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    intensity: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    targetMuscleGroups: [{ type: String, required: true }],
    createdAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

const Workout = mongoose.model<WorkoutDocument>("Workout", workoutSchema);
export default Workout;
