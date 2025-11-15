'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function UploadPhoto({ userId, currentUrl }: { userId: string; currentUrl?: string | null }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const filePath = `${userId}/avatar.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('Upload failed');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('profile-photos').getPublicUrl(filePath);
    await supabase.from('profiles').update({ profile_photo_url: data.publicUrl }).eq('id', userId);

    setPreview(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#d4af37]">
        {preview ? (
          <Image src={preview} alt="Profile" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[#0f172a] flex items-center justify-center text-4xl text-[#d4af37]">
            {userId[0].toUpperCase()}
          </div>
        )}
      </div>
      <label className="px-6 py-2 bg-[#d4af37] text-[#0f172a] rounded-lg cursor-pointer hover:bg-[#f0c857] transition-all">
        {uploading ? 'Uploading...' : 'Upload Photo'}
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
      </label>
    </div>
  );
}
