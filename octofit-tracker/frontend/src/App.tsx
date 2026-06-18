import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import { getCodespaceName, getApiBaseUrl } from "./lib/api";

export default function App() {
  const codespaceName = getCodespaceName();
  const hasCodespace = Boolean(codespaceName);

  return (
    <BrowserRouter>
      <main>
        <header>
          <h1>OctoFit Tracker</h1>
          <p>Multi-tier React frontend with Codespaces-aware API URLs.</p>
          <p>
            API base: <strong>{getApiBaseUrl()}</strong>
          </p>
          <p>
            {hasCodespace ? (
              <span>Using Codespaces host: {codespaceName}</span>
            ) : (
              <span>Using localhost fallback. Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs.</span>
            )}
          </p>
        </header>

        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/activities">Activities</NavLink>
            </li>
            <li>
              <NavLink to="/teams">Teams</NavLink>
            </li>
            <li>
              <NavLink to="/workouts">Workouts</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome</h2>
                <p>This frontend talks to the backend API using Codespaces-aware URLs when available.</p>
                <p>Supported endpoints:</p>
                <ul>
                  <li>{getApiBaseUrl()}/users</li>
                  <li>{getApiBaseUrl()}/activities</li>
                  <li>{getApiBaseUrl()}/teams</li>
                  <li>{getApiBaseUrl()}/workouts</li>
                  <li>{getApiBaseUrl()}/leaderboard</li>
                </ul>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
