'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/invite-code');
  }, [user, router]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://clubmitos.com/auth/callback',
      },
    });
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-md w-full mx-4 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-3xl font-serif text-center mb-2 text-[#d4af37]">Welcome to Mitos</h1>
        <p className="text-center text-gray-400 mb-8">Exclusive membership by invitation only</p>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-8 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
