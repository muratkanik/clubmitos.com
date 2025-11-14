'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

type Props = {
  userId: string;
  initialUrl?: string | null;
};

export function UploadPhoto({ userId, initialUrl }: Props) {
  const supabase = useSupabaseClient();
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const bucketUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-photos`;

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    const extension = file.name.split('.').pop();
    const path = `${userId}/avatar.${extension ?? 'jpg'}`;

    const { error: uploadError } = await supabase.storage.from('profile-photos').upload(path, file, {
      upsert: true,
      cacheControl: '3600'
    });

    if (uploadError) {
      setMessage('Yükleme sırasında hata oluştu.');
      setIsUploading(false);
      return;
    }

    const publicUrl = `${bucketUrl}/${path}?v=${Date.now()}`;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ profile_photo_url: publicUrl })
      .eq('id', userId);

    if (profileError) {
      setMessage('Profil güncellenemedi.');
      setIsUploading(false);
      return;
    }

    setPreview(publicUrl);
    setMessage('Fotoğraf güncellendi.');
    setIsUploading(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
          {preview ? (
            <Image src={preview} alt="Profil fotoğrafı" width={96} height={96} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Fotoğraf yok</div>
          )}
        </div>
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            aria-label="Profil fotoğrafı seç"
          />
          <Button type="button" variant="outline" disabled={isUploading} onClick={() => inputRef.current?.click()}>
            {isUploading ? 'Yükleniyor…' : 'Fotoğraf Yükle'}
          </Button>
          <p className="text-xs text-slate-500">Desteklenen formatlar: JPG, PNG. Maksimum 5MB.</p>
        </div>
      </div>
      {message && <p className={cn('text-sm', message.includes('hata') ? 'text-red-500' : 'text-green-600')}>{message}</p>}
    </div>
  );
}
