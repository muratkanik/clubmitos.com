'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '../lib/utils';

const inviteSchema = z
  .string()
  .min(6, 'Kod en az 6 karakter olmalı.')
  .max(64, 'Kod en fazla 64 karakter olabilir.')
  .regex(/^[A-Za-z0-9-]+$/, 'Sadece harf, rakam ve tire kullanabilirsiniz.');

type Props = {
  onVerified?: (code: string) => void;
  className?: string;
};

export function InviteCodeInput({ onVerified, className }: Props) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const parseResult = inviteSchema.safeParse(code.trim());

    if (!parseResult.success) {
      setStatus('error');
      setMessage(parseResult.error.errors[0].message);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/invite/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: parseResult.data })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(data?.error ?? 'Kod doğrulanamadı.');
        return;
      }

      setStatus('success');
      setMessage('Kod doğrulandı. Google ile giriş yapabilirsiniz.');
      onVerified?.(parseResult.data);
    } catch (fetchError) {
      console.error(fetchError);
      setStatus('error');
      setMessage('Sunucuya bağlanırken bir sorun oluştu.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
      <div className="space-y-2">
        <Label htmlFor="invite-code">Davet Kodu</Label>
        <Input
          id="invite-code"
          maxLength={64}
          value={code}
          onChange={(event) => setCode(event.currentTarget.value)}
          placeholder="Örn. MITOS-ALFA-2025"
          autoComplete="off"
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      {message && (
        <p className={cn('text-sm', status === 'error' ? 'text-red-500' : 'text-green-600')} role={status === 'error' ? 'alert' : 'status'}>
          {message}
        </p>
      )}

      <Button type="submit" disabled={status === 'loading' || status === 'success'} className="w-full">
        {status === 'loading' ? 'Doğrulanıyor…' : status === 'success' ? 'Kod Onaylandı' : 'Kodu Doğrula'}
      </Button>
    </form>
  );
}
