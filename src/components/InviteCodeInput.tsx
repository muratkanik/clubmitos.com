'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function InviteCodeInput({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: inviteData, error: inviteError } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .is('used_by', null)
      .single();

    if (inviteError || !inviteData) {
      setError('Invalid or already used code');
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('invite_codes').update({ used_by: user.id, used_at: new Date().toISOString() }).eq('id', inviteData.id);
    await supabase.from('profiles').upsert({ id: user.id });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="ENTER CODE"
        className="w-full px-6 py-4 bg-white/10 border-2 border-[#d4af37] rounded-lg text-white text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        maxLength={8}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading || code.length < 4}
        className="w-full px-8 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Submit'}
      </button>
    </form>
  );
}
