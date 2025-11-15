import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function InviteCodeScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const { data: inviteData, error: inviteError } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .is('used_by', null)
      .single();

    if (inviteError || !inviteData) {
      setError('Invalid or already used code');
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('invite_codes').update({ used_by: user.id, used_at: new Date().toISOString() }).eq('id', inviteData.id);
    await supabase.from('profiles').upsert({ id: user.id });

    router.push('/(tabs)');
  };

  return (
    <View className="flex-1 bg-[#0f172a] items-center justify-center p-6">
      <Text className="text-3xl font-serif text-[#d4af37] mb-4">Enter Your Code</Text>
      <Text className="text-gray-400 text-center mb-8">Verify your exclusive invitation</Text>
      <TextInput
        value={code}
        onChangeText={(text) => setCode(text.toUpperCase())}
        placeholder="ENTER CODE"
        placeholderTextColor="#666"
        maxLength={8}
        className="w-full px-6 py-4 bg-white/10 border-2 border-[#d4af37] rounded-lg text-white text-center text-xl tracking-widest mb-4"
      />
      {error ? <Text className="text-red-400 mb-4">{error}</Text> : null}
      <Pressable
        onPress={handleSubmit}
        disabled={loading || code.length < 4}
        className="w-full px-8 py-4 bg-[#d4af37] rounded-lg"
      >
        <Text className="text-[#0f172a] font-semibold text-center">
          {loading ? 'Verifying...' : 'Submit'}
        </Text>
      </Pressable>
    </View>
  );
}
