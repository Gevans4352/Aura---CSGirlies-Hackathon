const TOKEN_KEY = "aura_access_token";

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
};

export async function api(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = auth.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || `Error ${res.status}`);
  }
  return res.json();
}
