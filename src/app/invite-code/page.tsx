'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import InviteCodeInput from '@/components/InviteCodeInput';
import Logo from '@/components/Logo';

export default function InviteCodePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      checkProfile();
    }
  }, [user, loading, router]);

  const checkProfile = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user!.id)
      .single();
    
    if (data) {
      router.push('/profile');
    }
    setHasProfile(!!data);
    setChecking(false);
  };

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <div className="text-[#d4af37]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-md w-full mx-4 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-3xl font-serif text-center mb-2 text-[#d4af37]">Enter Your Code</h1>
        <p className="text-center text-gray-400 mb-8">Verify your exclusive invitation</p>
        <InviteCodeInput onSuccess={() => router.push('/profile')} />
      </div>
    </div>
  );
}
