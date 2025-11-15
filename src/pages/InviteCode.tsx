import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';

export default function InviteCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError(t('inviteCodeRequired'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if invite code exists and is valid
      const { data: inviteCode, error: fetchError } = await supabase
        .from('invite_codes')
        .select('*')
        .eq('code', code.trim())
        .single();

      if (fetchError || !inviteCode) {
        setError(t('inviteCodeInvalid'));
        setLoading(false);
        return;
      }

      // Check if already used
      if (inviteCode.used_by) {
        setError(t('inviteCodeAlreadyUsed') || 'Bu davet kodu zaten kullanılmış');
        setLoading(false);
        return;
      }

      // Store the valid invite code in session storage
      sessionStorage.setItem('validInviteCode', code.trim());
      
      // Redirect to registration page
      navigate('/register');
    } catch (err: any) {
      setError(err.message || t('inviteCodeInvalid'));
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-8">
        <div className="flex justify-center mb-8"><Logo /></div>
        <h1 className="text-3xl font-serif text-[#d4af37] text-center mb-8">{t('inviteCodeTitle')}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('inviteCodePlaceholder')}
            className="w-full px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full px-6 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all disabled:opacity-50">
            {loading ? t('loading') : t('inviteCodeSubmit')}
          </button>
        </form>
      </div>
    </div>
  );
}
