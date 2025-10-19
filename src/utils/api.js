import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

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
    await AsyncStorage.setItem("role", data.user.role);
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

export const verifyLinkCode = async (code, device_info) => {
    try {
        console.log("Verificando código:", code);
        console.log("Device info:", device_info);

        const res = await fetch(`${API_URL}/api/linkcodes/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                device_info
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Error del servidor:", data);
            return { ok: false, data };
        }

        if (data.message && data.child_id) {
            // Guardar el child_id en AsyncStorage si es necesario
            await AsyncStorage.setItem("child_id", JSON.stringify(data.child_id));
            return { ok: true, data };
        }

        return { ok: false, data };
    } catch (error) {
        console.error("Error al verificar el código:", error);
        return { ok: false, data: { message: "Error de conexión" } };
    }
};
