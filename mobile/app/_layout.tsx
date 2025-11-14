import { Stack } from 'expo-router';
import { AuthProvider } from '@/providers/AuthProvider';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="invite-code" />
      </Stack>
    </AuthProvider>
  );
}


