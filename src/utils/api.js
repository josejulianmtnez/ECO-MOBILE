const API_URL = "http://192.168.0.16:3500";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const signup = async (name, email, password, role = null) => {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role, password }),
  });
  const data = await res.json();
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("tutor_id", JSON.stringify(data.user.id));
  }
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (data.token) {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("tutor_id", JSON.stringify(data.user.id));
  }
  return data;
};

export const generateLinkCode = async (tutor_id) => {
  const res = await fetch(`${API_URL}/api/linkcodes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tutor_id }),
  });
  return res.json();
};
