const TOKEN_KEY = "aura_access_token";
const REFRESH_TOKEN_KEY = "aura_refresh_token";

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token) => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

async function refreshSession() {
  const refreshToken = auth.getRefreshToken();
  if (!refreshToken) return false;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );
  if (!res.ok) return false;

  const data = await res.json();
  auth.setToken(data.access_token);
  auth.setRefreshToken(data.refresh_token);
  return true;
}

export async function api(path, { method = "GET", body } = {}) {
  const request = () => {
    const headers = { "Content-Type": "application/json" };
    const token = auth.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    return fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  let res = await request();

  if (res.status === 401) {
    if (await refreshSession()) {
      res = await request();
    } else {
      auth.clearToken();
      window.location.assign("/login");
      throw new Error("Session expired. Please sign in again.");
    }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || `Error ${res.status}`);
  }
  return res.json();
}
