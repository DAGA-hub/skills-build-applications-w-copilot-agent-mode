import { useEffect, useState } from "react";
import { getApiBaseUrl, normalizeArrayResponse } from "../lib/api";

interface TeamRef {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  activeGoal: string;
  team?: TeamRef;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `${getApiBaseUrl()}/users`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(normalizeArrayResponse<User>(data));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users…</p>;
  }

  if (error) {
    return <p className="error">Unable to load users: {error}</p>;
  }

  return (
    <section>
      <h2>Users</h2>
      <p>Fetching from {getApiBaseUrl()}/users</p>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> ({user.role}) <br />
              {user.email} <br />
              Active goal: {user.activeGoal} <br />
              Team: {user.team?.name ?? "Unassigned"}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
