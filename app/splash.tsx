import { images } from "@/constants/images";
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/roles');
        }, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <ImageBackground 
            source={images.bgSplash} 
            className="flex-1 justify-center items-center"
        >
        </ImageBackground>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({});
