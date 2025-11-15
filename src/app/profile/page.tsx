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

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (!data) router.push('/invite-code');
        setProfile(data);
      });
    }
  }, [user, loading, router]);

  if (loading || !profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20">
            <h1 className="text-4xl font-serif text-[#d4af37] mb-8 text-center">Your Profile</h1>
            <UploadPhoto userId={user!.id} currentUrl={profile.profile_photo_url} />
            <div className="mt-8 space-y-4 text-center">
              <p className="text-gray-400">Email: {user!.email}</p>
              <p className="text-gray-400">Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
              {profile.is_admin && <p className="text-[#d4af37] font-semibold">Admin Access</p>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
