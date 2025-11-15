import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';

export default function Login() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/invite-code` }
    });
  };

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-[#d4af37]">{t('loading')}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h1 className="text-3xl font-serif text-[#d4af37] text-center mb-8">{t('welcome')}</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-6 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all"
        >
          {t('loginWithGoogle')}
        </button>
      </div>
    </div>
  );
}


