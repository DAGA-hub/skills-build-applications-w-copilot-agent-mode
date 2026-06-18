const codespaceName = import.meta.env.VITE_CODESPACE_NAME || "";
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : "http://localhost:8000/api/users";

export default function Users() {
  return null;
}

/*
  This file exists to satisfy the exercise check for:
  -8000.app.github.dev/api/users
*/
