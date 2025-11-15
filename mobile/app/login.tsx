import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'clubmitos://invite-code',
      },
    });
    
    if (data.url) {
      await WebBrowser.openAuthSessionAsync(data.url, 'clubmitos://');
      router.push('/invite-code');
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-[#0f172a] items-center justify-center p-6">
      <Image
        source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/69182fda1b8b8c653c1d3f2f_1763192995705_f9b13027.webp' }}
        className="w-24 h-24 mb-8"
      />
      <Text className="text-4xl font-serif text-[#d4af37] mb-4">Club Mitos</Text>
      <Text className="text-gray-400 text-center mb-8">Exclusive membership by invitation only</Text>
      <Pressable
        onPress={handleGoogleLogin}
        disabled={loading}
        className="w-full px-8 py-4 bg-[#d4af37] rounded-lg"
      >
        <Text className="text-[#0f172a] font-semibold text-center">
          {loading ? 'Loading...' : 'Continue with Google'}
        </Text>
      </Pressable>
    </View>
  );
}
