import { images } from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { generateLinkCode } from "../../src/utils/api.js";

export default function LinkCodeScreen() {
  const [linkCode, setLinkCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutorId, setTutorId] = useState<number | null>(null);
  const [alreadyGenerated, setAlreadyGenerated] = useState(false)

  const steps = [
    "Descargue e instale la aplicación en el dispositivo de su hijo.",
    "Inicie la aplicación en el dispositivo a supervisar.",
    'Seleccione la opción "De mi hijo" en la pantalla de roles.',
    "Ingrese el código de vinculación que se muestra a continuación:"
  ];

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
      setLinkCode(data.code);
    } catch (error) {
      console.error("Error generando código:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tutorId && !alreadyGenerated) {
      handleGenerateCode()
      setAlreadyGenerated(true)
    }
  }, [tutorId])

  return (
        <View className="flex-1 bg-gray-100 items-center pt-16 px-6">
      <Text className="text-primary text-4xl font-bold text-center mb-6">
        Tu tranquilidad comienza aquí
      </Text>

      <Image source={images.woman} className="w-72 h-72 mb-6" resizeMode="contain" />

      <View className="w-full max-w-md mb-6">
        {steps.map((step, index) => (
          <View key={index} className="flex-row items-start mb-3 ml-2 justify-center items-center">
            <View className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 " />
            <Text className="text-primary text-sm flex-1">{step}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleGenerateCode}
        className="bg-blue-500 px-4 py-2 rounded mb-8"
      >
        <Text className="text-white text-lg">Generar nuevo código de vinculación</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {linkCode != null && (
        <View className="flex-row space-x-2">
          {linkCode.split("").map((digit, index) => (
            <View
              key={index}
              className="w-12 h-12 border border-gray-400 justify-center items-center rounded"
            >
              <Text className="text-xl font-bold">{digit}</Text>
            </View>
          ))}
        </View>
      )}
      </View>
  );
}
