import { Stack } from "expo-router";
import "./globals.css";

// Eliminar el header de rutas por defecto
export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="pairing" options={{ headerShown: false }} />
      <Stack.Screen name="roles" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
