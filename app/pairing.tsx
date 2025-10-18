import { images } from "@/constants/images";
import MainButton from "@/src/components/mainButton";
import { verifyLinkCode } from "@/src/utils/api";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    TextInput as RNTextInput,
    Text,
    TextInput,
    View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PairingScreen = () => {
  const router = useRouter();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  const inputs = useRef<(RNTextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const hex = text.toUpperCase().replace(/[^0-9A-F]/g, "");

    if (hex) {
      const newCode = [...code];
      newCode[index] = hex;
      setCode(newCode);

      if (index < 5 && inputs.current[index + 1]) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

    const handleSubmit = async () => {
        const finalCode = code.join("");
        console.log("Código ingresado:", finalCode);

        if (finalCode.length < 6) {
            alert("Por favor, ingresa un código de 6 caracteres.");
            return;
        }

        const device_info = {
        uuid: Device.osInternalBuildId || "Unknown",
        name: Device.deviceName || "Unknown",
        model: Device.modelName || "Unknown",
        os_version: Device.osVersion || "Unknown",
        };

        try {
            console.log("Enviando datos:", { finalCode, device_info });
            const res = await verifyLinkCode(finalCode, device_info);

            if (res.ok) {
                await AsyncStorage.setItem("child_device_registered", "true");
                console.log("Vinculación exitosa:", res.data);
                router.replace('/(tabs)');
            } else {
                console.error("Error en vinculación:", res.data);
                alert(res.data?.message || "Código inválido. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert("Error de conexión. Por favor, inténtalo de nuevo.");
        }
    };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" enabled={true} behavior="padding">
        <View className="flex-1 items-center justify-center px-6 bg-white">
            <Image source={images.pairing} className="w-80 h-80" resizeMode="contain" />

            <Text className="text-primary text-center text-xl mt-2">
                Para vincular este dispositivo como supervisado, ingrese el código de vinculación
                proporcionado por el dispositivo principal.
            </Text>

            <View className="flex-row justify-center mt-10 space-x-6">
                {code.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                    inputs.current[index] = ref;
                    }}
                    className="w-14 h-14 text-center text-white text-2xl bg-primary rounded-xl"
                    keyboardType="default"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    returnKeyType="next"
                    onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace" && code[index] === "") {
                        if (index > 0) {
                        const newCode = [...code];
                        newCode[index - 1] = "";
                        setCode(newCode);
                        inputs.current[index - 1]?.focus();
                        }
                    }
                    }}
                />
                ))}
            </View>

            <MainButton
                onPress={handleSubmit}
                disabled={false}
                title={"Vincular"}
            />
            <Text className="text-center text-primary text-xl mt-10">
                ¿Aún no tienes cuenta?{" "}
                <Text className="font-semibold" 
                    onPress={() => {
                        router.push('/login');
                    }}>
                    Regístrate
                </Text>
            </Text>
        </View>
    </KeyboardAvoidingView>
  );
};

export default PairingScreen;
