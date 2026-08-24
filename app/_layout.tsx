import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="painel" />
        <Stack.Screen name="adicionar" />
        <Stack.Screen name="historico" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="dados" />
        <Stack.Screen name="auth" />
      </Stack>
    </>
  );
}
