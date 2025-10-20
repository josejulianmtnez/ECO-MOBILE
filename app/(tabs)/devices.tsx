import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getChildrenDevicesByTutor } from "../../src/utils/api.js";
import { images } from "@/constants/images";

export default function Devices() {
    const [tutorId, setTutorId] = useState<number | null>(null);
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTutorData = async () => {
        try {
            const storedId = await AsyncStorage.getItem("tutor_id");
            if (storedId) {
                const id = Number(storedId);
                setTutorId(id);
                const response = await getChildrenDevicesByTutor(id);
                setDevices(response || []);
            }
        } catch (error) {
            console.error("Error al cargar dispositivos:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchTutorData();
    }, []);
    if (loading) {
        return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text className="text-primary mt-3">Cargando dispositivos...</Text>
        </View>
        );
    }
    return (
        <ScrollView
            className="flex-1 bg-gray-100"
            contentContainerStyle={{ alignItems: "center", paddingTop: 60, paddingBottom: 60, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <Text className="text-primary text-4xl font-bold text-center mb-6">
                Dispositivos Vinculados
            </Text>

            {devices.length === 0 ? (
                <View className="flex-1 justify-center items-center mt-24">
                    <Image source={images.device} className="w-72 h-72 mb-6" resizeMode="contain" />
                    <Text className="text-gray-500 text-center text-lg">
                        Aun no hay dispositivos vinculados.
                    </Text>
                </View>
            ) : null}

            <View className="w-full max-w-md mb-40">
                {devices.length > 0 ? (
                    devices.map((device, index) => (
                        <TouchableOpacity
                        key={index}
                        className="bg-white p-4 mb-3 rounded-2xl shadow flex-row items-center active:bg-primary/20"
                        onPress={() => console.log("Dispositivo seleccionado:", device)} //Cambiar a onPress={() => navigation.navigate("DeviceDetails", { device })}
                        >
                        <View className="w-3 h-3 bg-primary rounded-full mr-3" />
                        <View className="flex-1">
                            <Text className="text-primary font-semibold text-base">
                            {device.name}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                            Modelo: {device.model} — OS {device.os_version}
                            </Text>
                        </View>
                        </TouchableOpacity>
                    ))
                ): null}
            </View>
        </ScrollView>
    );
}
