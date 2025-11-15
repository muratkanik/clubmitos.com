'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import UploadPhoto from '@/components/UploadPhoto';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadProfile();
    }
  }, [user, loading, router]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user!.id)
      .single();
    
    if (!data) {
      router.push('/invite-code');
    }
    setProfile(data);
    setChecking(false);
  };

  if (loading || checking || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="text-[#d4af37]">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20">
            <h1 className="text-4xl font-serif text-[#d4af37] mb-8 text-center">Your Profile</h1>
            <UploadPhoto userId={user!.id} currentUrl={profile.profile_photo_url} />
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white text-lg">{profile.full_name}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white text-lg">{profile.email}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-[#d4af37] text-lg font-semibold uppercase">{profile.status}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white text-lg">{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              {profile.role === 'admin' && (
                <div className="text-center pt-4 border-t border-[#d4af37]/20">
                  <p className="text-[#d4af37] font-semibold">Admin Access</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
