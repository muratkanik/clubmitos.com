import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function UploadPhoto({ userId, currentUrl }: { userId: string; currentUrl?: string | null }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const filePath = `${userId}/avatar.jpg`;

    const { error } = await supabase.storage.from('profile-photos').upload(filePath, blob, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from('profile-photos').getPublicUrl(filePath);
      await supabase.from('profiles').update({ profile_photo_url: data.publicUrl }).eq('id', userId);
      setPreview(data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <View className="items-center space-y-4">
      <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#d4af37]">
        {preview ? (
          <Image source={{ uri: preview }} className="w-full h-full" />
        ) : (
          <View className="w-full h-full bg-[#0f172a] items-center justify-center">
            <Text className="text-4xl text-[#d4af37]">{userId[0].toUpperCase()}</Text>
          </View>
        )}
      </View>
      <Pressable onPress={pickImage} disabled={uploading} className="px-6 py-3 bg-[#d4af37] rounded-lg">
        <Text className="text-[#0f172a] font-semibold">
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </Text>
      </Pressable>
    </View>
  );
}
