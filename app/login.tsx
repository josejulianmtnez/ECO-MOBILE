import {StyleSheet, View, TextInput, Button, Text} from 'react-native'
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "../src/utils/api";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      if (res.token) {
        // Guarda token localmente (AsyncStorage)
        router.push("/");
      } else {
        setError(res.message || "Error en login");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      {error && <Text>{error}</Text>}
    </View>
  );
}
