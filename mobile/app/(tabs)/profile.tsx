import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import UploadPhoto from '../../components/UploadPhoto';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        setProfile(data);
      });
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user || !profile) return null;

  return (
    <ScrollView className="flex-1 bg-[#0f172a] p-6">
      <View className="items-center space-y-6">
        <UploadPhoto userId={user.id} currentUrl={profile.profile_photo_url} />
        <View className="w-full p-6 bg-white/5 rounded-2xl border border-[#d4af37]/20 space-y-4">
          <Text className="text-gray-400">Email: {user.email}</Text>
          <Text className="text-gray-400">
            Member since: {new Date(profile.created_at).toLocaleDateString()}
          </Text>
          {profile.is_admin && <Text className="text-[#d4af37] font-semibold">Admin Access</Text>}
        </View>
        <Pressable onPress={handleSignOut} className="w-full px-8 py-4 bg-[#d4af37]/20 rounded-lg">
          <Text className="text-[#d4af37] font-semibold text-center">Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
