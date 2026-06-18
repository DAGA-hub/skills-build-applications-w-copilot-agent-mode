import { useEffect, useState } from "react";
import { getApiBaseUrl, normalizeArrayResponse } from "../lib/api";

interface Team {
  _id: string;
  name: string;
  score: number;
}

interface LeaderboardEntry {
  _id: string;
  rank: number;
  team?: Team;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/leaderboard`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setEntries(normalizeArrayResponse<LeaderboardEntry>(data));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="error">Unable to load leaderboard: {error}</p>;
  }

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Fetching from {getApiBaseUrl()}/leaderboard</p>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={entry._id}>
              #{entry.rank} — {entry.team?.name ?? "Unknown team"} ({entry.team?.score ?? 0} points)
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
