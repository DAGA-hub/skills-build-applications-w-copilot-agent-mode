import { useEffect, useState } from "react";
import { getApiBaseUrl, normalizeArrayResponse } from "../lib/api";

interface Workout {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  createdAt: string;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/workouts`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setWorkouts(normalizeArrayResponse<Workout>(data));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading workouts…</p>;
  }

  if (error) {
    return <p className="error">Unable to load workouts: {error}</p>;
  }

  return (
    <section>
      <h2>Workouts</h2>
      <p>Fetching from {getApiBaseUrl()}/workouts</p>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.type}</strong> — {workout.durationMinutes} min, {workout.caloriesBurned} cal <br />
              Created at: {new Date(workout.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
