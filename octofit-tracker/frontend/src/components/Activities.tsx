import { useEffect, useState } from "react";
import { getApiBaseUrl, normalizeArrayResponse } from "../lib/api";

interface UserRef {
  _id: string;
  name: string;
}

interface TeamRef {
  _id: string;
  name: string;
}

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  performedAt: string;
  user?: UserRef;
  team?: TeamRef;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/activities`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setActivities(normalizeArrayResponse<Activity>(data));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading activities…</p>;
  }

  if (error) {
    return <p className="error">Unable to load activities: {error}</p>;
  }

  return (
    <section>
      <h2>Activities</h2>
      <p>Fetching from {getApiBaseUrl()}/activities</p>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.caloriesBurned} cal
              {activity.distanceKm != null ? `, ${activity.distanceKm} km` : ""} <br />
              {activity.user ? `User: ${activity.user.name}` : "User: unknown"} <br />
              {activity.team ? `Team: ${activity.team.name}` : "Team: unknown"} <br />
              Performed at: {new Date(activity.performedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
