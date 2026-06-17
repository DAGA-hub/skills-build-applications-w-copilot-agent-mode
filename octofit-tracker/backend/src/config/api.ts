/**
 * API configuration for Codespaces and localhost
 */

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  const port = process.env.PORT ?? 8000;
  return `http://localhost:${port}`;
}

export default getApiBaseUrl;
