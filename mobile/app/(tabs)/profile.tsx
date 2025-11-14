import { View, Text } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { UploadPhoto } from '@/components/UploadPhoto'

export default function Profile() {
  const { user } = useAuth()

  return (
    <View className="flex-1 items-center justify-center p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Profil</Text>
      <Text className="text-lg mb-4">{user?.email}</Text>
      <UploadPhoto />
    </View>
  )
}