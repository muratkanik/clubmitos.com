import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import UploadPhoto from '@/components/UploadPhoto';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  const handlePhotoUploaded = (url: string) => {
    setProfile({ ...profile, profile_photo_url: url });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-8">
        <h1 className="text-4xl font-serif text-[#d4af37] mb-8">{t('profile')}</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">{t('uploadPhoto')}</label>
            <UploadPhoto userId={user?.id || ''} currentPhotoUrl={profile?.profile_photo_url} onPhotoUploaded={handlePhotoUploaded} />
          </div>
          {profile?.profile_photo_url && (
            <div className="flex justify-center">
              <img src={profile.profile_photo_url} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-[#d4af37]" />
            </div>
          )}
          <div className="pt-4 border-t border-[#d4af37]/20">
            <p className="text-gray-400">Email: <span className="text-white">{user?.email}</span></p>
            {profile?.is_admin && <p className="text-[#d4af37] mt-2">{t('admin')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

