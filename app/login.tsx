import { images } from "@/constants/images";
import CustomTextInput from "@/src/components/customTextInput";
import MainButton from "@/src/components/mainButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View
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

  return (
    <View style={styles.segmentedContainer}>
      <Pressable
        onPress={() => onSelect("login")}
        style={[
          styles.segmentButton,
          isLogin ? styles.activeLoginButton : styles.inactiveButton
        ]}
      >
        <Text
          style={[
            styles.segmentText,
            isLogin ? styles.activeLoginText : styles.inactiveText
          ]}
        >
          Iniciar Sesión
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onSelect("register")}
        style={[
          styles.segmentButton,
          !isLogin ? styles.activeRegisterButton : styles.inactiveButton
        ]}
      >
        <Text
          style={[
            styles.segmentText,
            !isLogin ? styles.activeRegisterText : styles.inactiveText
          ]}
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
    if (!email.trim() || !password.trim()) {
      const msg = "Por favor, ingresa correo y contraseña"
      alert(msg)
      setError(msg)
      
      return
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.token) {
        await AsyncStorage.setItem("sessionData", JSON.stringify(res))
        router.replace("/");
      } else {
        alert(res.message || "Error al iniciar sesión");
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
      alert("Por favor, completa todos los campos");
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signup(name, email, password);
      if (res.token) {
        router.replace("/");
      } else {
        alert(res.message || "Error al registrarse");
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
    <KeyboardAvoidingView className="flex-1 bg-white" enabled={true} behavior="padding">
      <ImageBackground
        source={images.bgLogin}
        resizeMode="cover"
        className="w-full h-[55%] items-center justify-center bg-white"
      >
        <View className="absolute top-[55%] w-full items-center">
          <View className="bg-white p-6 w-11/12 max-w-sm rounded-3xl shadow-2xl">
            <SegmentedControl selected={authMode} onSelect={setAuthMode} />

            <View className="mt-8">
              {authMode === "login" ? (
                <>
                  <CustomTextInput
                    label="Correo electrónico"
                    value={email.trim()}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                  />

                  <CustomTextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />
                </>
              ) : (
                <>
                  <CustomTextInput
                    label="Nombre Completo"
                    value={name}
                    onChangeText={setName}
                    secureTextEntry={false}
                  />

                  <CustomTextInput
                    label="Correo electrónico"
                    value={email.trim()}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                  />

                  <CustomTextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  segmentedContainer: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 32,
    height: 64,
  },
  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 32,
  },
  activeLoginButton: {
    backgroundColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  activeRegisterButton: {
    backgroundColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  segmentText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeLoginText: {
    color: '#FFFFFF',
  },
  activeRegisterText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#6B7280',
  },
});
