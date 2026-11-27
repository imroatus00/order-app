
export const TOKEN_KEY = "abata_admin_token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const { auth = true, ...fetchOptions } = options;

  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server");
  }

  return data;
}

export const api = {
  get: (path, options = {}) =>
    request(path, { ...options, method: "GET" }),

  post: (path, body, options = {}) =>
    request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body, options = {}) =>
    request(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (path, body, options = {}) =>
    request(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (path, options = {}) =>
    request(path, { ...options, method: "DELETE" }),
};
