import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function AdminScreen() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (!data?.is_admin) {
          router.push('/(tabs)');
          return;
        }
        setIsAdmin(true);
        loadData();
      });
    });
  }, []);

  const loadData = async () => {
    const { data: usersData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    const { data: codesData } = await supabase.from('invite_codes').select('*').order('created_at', { ascending: false });
    setUsers(usersData || []);
    setCodes(codesData || []);
  };

  const generateCode = async () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('invite_codes').insert({ code, created_by: user!.id });
    loadData();
  };

  if (!isAdmin) return null;

  return (
    <ScrollView className="flex-1 bg-[#0f172a] p-6">
      <Pressable onPress={generateCode} className="mb-6 px-6 py-4 bg-[#d4af37] rounded-lg">
        <Text className="text-[#0f172a] font-semibold text-center">Generate Code</Text>
      </Pressable>

      <Text className="text-2xl font-serif text-[#d4af37] mb-4">Members</Text>
      <View className="space-y-4 mb-8">
        {users.map((u) => (
          <View key={u.id} className="flex-row items-center gap-4 p-4 bg-white/5 rounded-lg">
            {u.profile_photo_url ? (
              <Image source={{ uri: u.profile_photo_url }} className="w-12 h-12 rounded-full" />
            ) : (
              <View className="w-12 h-12 rounded-full bg-[#d4af37] items-center justify-center">
                <Text className="text-[#0f172a]">{u.id[0]}</Text>
              </View>
            )}
            <Text className="flex-1 text-gray-400 text-xs">{u.id}</Text>
          </View>
        ))}
      </View>

      <Text className="text-2xl font-serif text-[#d4af37] mb-4">Invite Codes</Text>
      <View className="space-y-4">
        {codes.map((c) => (
          <View key={c.id} className={`p-4 rounded-lg ${c.used_by ? 'bg-white/5' : 'bg-[#d4af37]/10'}`}>
            <Text className="text-xl font-mono text-[#d4af37]">{c.code}</Text>
            <Text className="text-xs text-gray-400">{c.used_by ? 'Used' : 'Available'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
