import {StyleSheet, Image, ImageBackground, Text, View} from 'react-native'
import {Tabs} from "expo-router"
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({focused, icon, title}: any) => {
    if(focused){
        return (
            <ImageBackground
                source={images.highlight}
                className={"flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"}
            >
                <Image source={icon} tintColor="#151312" className={"size-5"}/>
                <Text className={"text-secondary text-base font-semibold ml-2"}>{title}</Text>
            </ImageBackground>
        )
    }
    return (
        <View className={"size-full justify-center items-center mt-4 rounded-full"}>
            <Image source={icon} tintColor="#A8B5DB" className={"size-5"} />
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
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
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
