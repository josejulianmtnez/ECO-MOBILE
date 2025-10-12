import {StyleSheet, Image, ImageBackground, Text, View} from 'react-native'
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({focused, icon, title}: any) => {
    if(focused){
        return (
            <ImageBackground
                source={images.tabFocus}
                className={"flex w-full h-28 min-w-[112px] min-h-14 justify-center items-center -translate-y-4"}
            >
                <ImageBackground 
                    source={images.tabFocusCircle} 
                    className={"w-20 h-20 justify-center items-center translate-y-1"}
                >
                    <Image source={icon} tintColor="#000000" className={"size-5"}/>
                </ImageBackground>
            </ImageBackground>
        )
    }
    return (
        <View className={"size-full justify-center items-center"}>
            <Image source={icon} tintColor="#FFFFFF" className={"size-5 translate-y-2"} />
        </View>
    )
}

const _Layout = () => {
    return (
        //Crea el tab bar en la parte inferior
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#098FFE",
                    width: "100%",
                    height: "12%",
                    position: "absolute",
                },
            }}
        >
            <Tabs.Screen
                name={"index"} // Archivo (o ruta) a editar
                options={{
                    title: 'Inicio', // Es el nombre personalizado a mostrar en el tab (si se deja vacío toma por defecto el nombre de la ruta, es decir, el del .tsx)
                    headerShown:false, // Elimina el header por defecto de esta pantalla en específico
                    tabBarIcon:({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title={"Inicio"}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"devices"}
                options={{
                    title: 'Dispositivos',
                    headerShown:false,
                    tabBarIcon:({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.devices}
                            title={"Dispositivos"}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"notifications"}
                options={{
                    title: 'Notificaciones',
                    headerShown:false,
                    tabBarIcon:({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.notification}
                            title={"Notificaciones"}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name={"profile"}
                options={{
                    title: 'Perfil',
                    headerShown:false,
                    tabBarIcon:({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title={"Perfil"}
                        />
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
const styles = StyleSheet.create({})
