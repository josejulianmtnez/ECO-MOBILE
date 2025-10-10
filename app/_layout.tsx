import { Stack } from "expo-router";
import './globals.css';

// Eliminar el header de rutas por defecto
export default function RootLayout() {
  return <Stack>
      <Stack.Screen
        name={"(tabs)"}
        options={{ headerShown: false }}
      />
  </Stack>

}
