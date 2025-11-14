'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { InviteCodeInput } from '../../components/InviteCodeInput';
import { Button } from '../../components/ui/button';

export default function LoginPage() {
  const { session } = useSessionContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabaseClient();
  const [verifiedCode, setVerifiedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onboardingIssue = searchParams?.get('error');

  const onboardingMessages: Record<string, string> = {
    onboarding: 'Davet kodu bulunamadı. Lütfen geçerli bir kod girin.',
    invite: 'Kullandığınız davet kodu geçersiz veya tüketilmiş.',
    profile: 'Profil oluşturulurken hata oluştu, tekrar deneyin.'
  };

  useEffect(() => {
    const hasError = Boolean(searchParams?.get('error'));
    if (session && !hasError) {
      router.replace('/profile');
    }
  }, [session, router, searchParams]);

  async function handleGoogleLogin() {
    if (!verifiedCode) {
      setError('Önce davet kodunu doğrulamalısınız.');
      return;
    }
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/v1/callback`
      }
    });

    if (signInError) {
      setError(signInError.message);
    }

    setLoading(false);
  }

  return (
    <div className="container flex max-w-3xl flex-col gap-8 py-16 lg:flex-row">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900">Davet kodunu doğrula, Google ile giriş yap.</h1>
        <p className="text-slate-600">
          Club Mitos herkese açık değildir. İlk girişte davet kodunun doğrulanması zorunludur. Kod doğrulandıktan sonra Google hesabınızla Supabase
          Auth üzerinden giriş yapabilirsiniz.
        </p>
        {onboardingIssue && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            {onboardingMessages[onboardingIssue] ?? 'Giriş tamamlanamadı, lütfen tekrar deneyin.'}
          </p>
        )}
        <InviteCodeInput
          onVerified={(code) => {
            setVerifiedCode(code);
            setError(null);
          }}
        />
        <Button className="w-full" size="lg" disabled={!verifiedCode || loading} onClick={handleGoogleLogin}>
          {loading ? 'Google yönlendiriliyor…' : 'Google ile devam et'}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Neden iki adımlı?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Daveti olmayan hesaplar otomatik olarak engellenir.</li>
          <li>İlk girişte profil satırı oluşturulur ve davet kodu kullanılmış sayılır.</li>
          <li>RLS politikaları yalnızca admin’lere tam yetki verir.</li>
        </ul>
      </div>
    </div>
  );
}
