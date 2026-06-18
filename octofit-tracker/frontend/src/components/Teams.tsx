import { useEffect, useState } from "react";
import { getApiBaseUrl, normalizeArrayResponse } from "../lib/api";

interface Team {
  _id: string;
  name: string;
  description: string;
  score: number;
  members?: string[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/teams`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTeams(normalizeArrayResponse<Team>(data));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading teams…</p>;
  }

  if (error) {
    return <p className="error">Unable to load teams: {error}</p>;
  }

  return (
    <section>
      <h2>Teams</h2>
      <p>Fetching from {getApiBaseUrl()}/teams</p>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>
              <strong>{team.name}</strong> — {team.description} <br />
              Score: {team.score} <br />
              Members: {team.members?.length ?? 0}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
