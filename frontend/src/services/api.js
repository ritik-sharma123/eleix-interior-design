const API_URL = import.meta.env.VITE_API_URL || "https://eleix-interior-design.onrender.com/api";
function getToken() {
  return localStorage.getItem("eleix_token");
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error("Network error — is the backend server running?");
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data;
}

export const api = {
  // Public
  submitLead: (payload) => request("/leads", { method: "POST", body: payload }),
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),

  // Protected
  me: () => request("/auth/me", { auth: true }),
  getLeads: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/leads${qs ? `?${qs}` : ""}`, { auth: true });
  },
  getLead: (id) => request(`/leads/${id}`, { auth: true }),
  updateLeadStatus: (id, status) => request(`/leads/${id}/status`, { method: "PATCH", body: { status }, auth: true }),
  assignLead: (id, assignedTo) => request(`/leads/${id}/assign`, { method: "PATCH", body: { assignedTo }, auth: true }),
  addNote: (id, text) => request(`/leads/${id}/notes`, { method: "POST", body: { text }, auth: true }),
  deleteLead: (id) => request(`/leads/${id}`, { method: "DELETE", auth: true }),
  getStats: () => request("/dashboard/stats", { auth: true }),
};
