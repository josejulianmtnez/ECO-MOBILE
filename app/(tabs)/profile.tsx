import React, {
    useEffect,
    useState,
} from 'react';

import {
    Button,
    Image,
    Text,
    View,
} from 'react-native';

import {
    SafeAreaView
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [sessionData, setSessionData] = useState(Object)

    useEffect(() => {
        (async () => {
            const raw = await AsyncStorage.getItem("sessionData")
            let data = null
            try {
                data = raw ? JSON.parse(raw) : null
            } catch (e) {}
            setSessionData(data)
        })()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/default-profile-icon.png')}
                    style={{ width: 128, height: 128, marginBottom: 24 }}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 32 }}>
                    Hola {sessionData && sessionData.user && sessionData.user.name ? sessionData.user.name : "Usuario"}
                </Text>
                <Button title="Cerrar sesión" onPress={() => alert("Cierre de sesión pendiente")} />
            </View>
        </SafeAreaView>
    )
}
