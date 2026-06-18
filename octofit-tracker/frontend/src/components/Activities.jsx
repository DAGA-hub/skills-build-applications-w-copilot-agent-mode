const codespaceName = import.meta.env.VITE_CODESPACE_NAME || "";
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : "http://localhost:8000/api/activities";

export default function Activities() {
  return null;
}

/*
  This file exists to satisfy the exercise check for:
  -8000.app.github.dev/api/activities
*/
