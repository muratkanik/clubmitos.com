import { View, Text, Button, Alert } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Admin() {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('id, is_admin')
        .then(({ data }) => {
          setProfiles(data || [])
          setLoading(false)
        })
    }
  }, [user])

  const toggleAdmin = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !current })
      .eq('id', id)

    if (!error) {
      setProfiles(profiles.map(p => p.id === id ? { ...p, is_admin: !current } : p))
    } else {
      Alert.alert('Hata', 'İşlem başarısız')
    }
  }

  if (loading) return <Text className="text-center p-6">Yükleniyor...</Text>

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Admin Paneli</Text>
      {profiles.map(p => (
        <View key={p.id} className="flex-row justify-between items-center p-3 border-b border-gray-200">
          <Text className="flex-1">{p.id.slice(0, 8)}...</Text>
          <Button
            title={p.is_admin ? "Admin Kaldır" : "Admin Yap"}
            onPress={() => toggleAdmin(p.id, p.is_admin)}
            color={p.is_admin ? "#dc2626" : "#16a34a"}
          />
        </View>
      ))}
    </View>
  )
}