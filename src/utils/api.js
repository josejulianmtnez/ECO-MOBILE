const API_URL = "http://192.168.0.16:3500";
export const signup = async (name, email, role, linked_child, password) => {
  const res = await fetch(`${API_URL}/api/auth/sign_up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role, linked_child, password }),
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/log_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
