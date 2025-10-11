import { images } from "@/constants/images";
import CustomTextInput from "@/src/components/customTextInput";
import MainButton from "@/src/components/mainButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import { login, signup } from "../src/utils/api";

const SegmentedControl = ({
  selected,
  onSelect,
}: {
  selected: "login" | "register";
  onSelect: (mode: "login" | "register") => void;
}) => {
  const isLogin = selected === "login";
  const activeShadow = "shadow-lg";

  return (
    <View className="flex-row p-1 bg-gray-300 rounded-full h-16">
      <Pressable
        onPress={() => onSelect("login")}
        className={`flex-1 justify-center py-2 rounded-full ${
          isLogin ? "bg-primary " + activeShadow : ""
        }`}
      >
        <Text
          className={`text-center font-bold ${
            isLogin ? "text-white" : "text-gray-600"
          }`}
        >
          Iniciar Sesión
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onSelect("register")}
        className={`flex-1 justify-center py-2 rounded-full ${
          !isLogin ? "bg-white " + activeShadow : ""
        }`}
      >
        <Text
          className={`text-center font-bold ${
            !isLogin ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Registrarse
        </Text>
      </Pressable>
    </View>
  );
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, ingresa correo y contraseña");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.token) {
        router.push("/");
      } else {
        setError(res.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");

    if (!email || !password || !confirmPassword || !name) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signup(email, password, name);
      if (res.token) {
        router.push("/");
      } else {
        setError(res.message || "Error al registrarse");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = authMode === "login" ? handleLogin : handleSignUp;

  return (
    <ImageBackground
      source={images.bgLogin}
      resizeMode="cover"
      className="w-full h-[55%] items-center justify-center"
    >
      <View className="absolute top-[65%] w-full items-center">
        <View className="bg-white p-6 w-11/12 max-w-sm rounded-3xl shadow-2xl">
          <SegmentedControl selected={authMode} onSelect={setAuthMode} />

          <View className="mt-8">
            <CustomTextInput
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              secureTextEntry={false}
            />

            <CustomTextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            {authMode === "register" && (
              <>
                <CustomTextInput
                  label="Nombre Completo"
                  value={name}
                  onChangeText={setName}
                  secureTextEntry={false}
                />

                <CustomTextInput
                  label="Confirmar Contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
              </>
            )}

            <MainButton
              onPress={handleSubmit}
              title={authMode === "login" ? "Iniciar Sesión" : "Registrarse"}
              disabled={isLoading}
            />

            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-lg">
                {authMode === "login" ? "Iniciar Sesión" : "Registrarse"}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
