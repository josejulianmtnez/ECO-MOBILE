import React from 'react';

import {
    Button,
    Image,
    Text,
    View,
} from 'react-native';

import {
    SafeAreaView
} from 'react-native-safe-area-context';

export default function Profile() {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/default-profile-icon.png')}
                    style={{ width: 128, height: 128, marginBottom: 24 }}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 32 }}>% username %</Text>
                <Button title="Cerrar sesión" onPress={() => alert("Cierre de sesión pendiente")} />
            </View>
        </SafeAreaView>
    )
}
