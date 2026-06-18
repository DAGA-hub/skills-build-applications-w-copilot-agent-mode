const codespaceName = String(import.meta.env.VITE_CODESPACE_NAME ?? "").trim();

export function getCodespaceName(): string {
  return codespaceName;
}

export function getApiBaseUrl(): string {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return "http://localhost:8000/api";
}

export function normalizeArrayResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const response = payload as Record<string, unknown>;
    if (Array.isArray(response.data)) {
      return response.data as T[];
    }
    if (Array.isArray(response.results)) {
      return response.results as T[];
    }
    if (Array.isArray(response.items)) {
      return response.items as T[];
    }
  }

  return [];
}
