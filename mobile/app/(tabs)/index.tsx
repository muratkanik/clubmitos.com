import { View, Text, Button } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'expo-router'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center p-6 bg-white">
        <Text className="text-2xl font-bold mb-4">Hoş Geldiniz</Text>
        <Button title="Giriş Yap" onPress={() => router.push('/login')} />
      </View>
    )
  }

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <Text className="text-3xl font-bold text-blue-600 mb-2">Club Mitos</Text>
      <Text className="text-lg mb-4">{user.email}</Text>
      <Button title="Profil" onPress={() => router.push('/profile')} />
      {user && (
        <Button title="Admin Paneli" onPress={() => router.push('/admin')} />
      )}
    </View>
  )
}