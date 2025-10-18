import { images } from "@/constants/images";
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View, Text, Pressable } from 'react-native';

const RolesScreen = () => {
    const router = useRouter();
    return (
        <View className="flex-1 items-center px-6">
            <Text className="text-primary justify-center text-center text-2xl mt-20">
                Para comenzar, necesitamos saber
            </Text>
            <Text className="text-primary justify-center text-center text-2xl mb-10 font-bold">
                ¿De quién es este dispositivo?
            </Text>

            <View className="w-full space-y-10">
                <Pressable onPress={() => router.push('/login')}>
                    <View className="bg-white p-5 rounded-[35px] shadow-md items-center h-80">
                        <Text className="text-center font-bold text-primary text-xl mb-4">
                        Mío
                        </Text>
                        <Image source={images.man} className="w-40 h-40" resizeMode="contain" />
                        <Text className="text-center text-xl mt-4">
                            Lo utilizaré para{" "}
                            <Text className="font-semibold">supervisar</Text>{" "}
                            el dispositivo de mi hijo
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => router.push('/pairing')}>
                    <View className="bg-white p-5 rounded-[35px] shadow-md items-center mt-10 h-80">
                        <Text className="text-center font-bold text-primary text-xl mb-4">
                        De mi hijo
                        </Text>
                        <Image source={images.boy} className="w-40 h-40" resizeMode="contain" />
                        <Text className="text-center text-xl mt-4">
                            Quiero{" "}
                            <Text className="font-semibold">supervisar</Text>{" "}
                            este dispositivo
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default RolesScreen;
