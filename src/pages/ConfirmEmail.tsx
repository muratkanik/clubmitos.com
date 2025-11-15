import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Geçersiz onay linki');
        return;
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email_confirmation_token', token)
        .single();

      if (error || !user) {
        setStatus('error');
        setMessage('Geçersiz veya süresi dolmuş onay linki');
        return;
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          email_confirmed: true,
          email_confirmed_at: new Date().toISOString(),
          status: 'guest',
          email_confirmation_token: null
        })
        .eq('id', user.id);

      if (updateError) {
        setStatus('error');
        setMessage('Email onaylanırken bir hata oluştu');
        return;
      }

      setStatus('success');
      setMessage('Email adresiniz başarıyla onaylandı! Misafir statüsü kazandınız.');
      setTimeout(() => navigate('/login'), 3000);
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-8 text-center">
        <div className="flex justify-center mb-8"><Logo /></div>
        <h1 className="text-3xl font-serif text-[#d4af37] mb-4">Email Onayı</h1>
        
        {status === 'loading' && (
          <p className="text-gray-300">Email adresiniz onaylanıyor...</p>
        )}
        
        {status === 'success' && (
          <div className="space-y-4">
            <p className="text-green-400">{message}</p>
            <p className="text-gray-300 text-sm">Giriş sayfasına yönlendiriliyorsunuz...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="space-y-4">
            <p className="text-red-400">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all"
            >
              Giriş Sayfasına Dön
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
