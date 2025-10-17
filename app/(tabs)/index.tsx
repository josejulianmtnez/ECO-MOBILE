import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateLinkCode } from "../../src/utils/api.js";

export default function LinkCodeScreen() {
  const [linkCode, setLinkCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutorId, setTutorId] = useState(null);

  // Al cargar la pantalla, obtenemos el tutor_id de AsyncStorage
  useEffect(() => {
    const fetchTutorId = async () => {
      const storedId = await AsyncStorage.getItem("tutor_id");
      if (storedId) setTutorId(Number(storedId));
    };
    fetchTutorId();
  }, []);

  const handleGenerateCode = async () => {
    if (!tutorId) return alert("No se encontró la sesión del tutor.");

    setLoading(true);
    try {
      const data = await generateLinkCode(tutorId);
      setLinkCode(data.code); // "A1B2C3"
    } catch (error) {
      console.error("Error generando código:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dividir el código en caracteres para mostrar en cuadritos
  const codeDigits = linkCode ? linkCode.split("") : [];

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TouchableOpacity
        onPress={handleGenerateCode}
        className="bg-blue-500 px-4 py-2 rounded mb-8"
      >
        <Text className="text-white text-lg">Generar Código de Vinculación</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {linkCode ? (
        <View className="flex-row space-x-2">
          {codeDigits.map((digit, index) => (
            <View
              key={index}
              className="w-12 h-12 border border-gray-400 justify-center items-center rounded"
            >
              <Text className="text-xl font-bold">{digit}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-gray-500">Tu código aparecerá aquí</Text>
      )}
    </View>
  );
}
