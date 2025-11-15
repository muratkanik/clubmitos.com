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

    try {
      // Check invite code
      const { data: inviteData, error: inviteError } = await supabase
        .from('invite_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (inviteError || !inviteData) {
        setError('Invalid invite code');
        setLoading(false);
        return;
      }

      // Check if code is still valid
      if (inviteData.current_uses >= inviteData.max_uses) {
        setError('This code has reached its usage limit');
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (existingUser) {
        setError('You already have an account');
        setLoading(false);
        return;
      }

      // Create user profile
      const { error: userError } = await supabase.from('users').insert({
        auth_user_id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email!.split('@')[0],
        status: 'guest',
        invite_code_used: code.toUpperCase(),
      });

      if (userError) {
        setError('Failed to create profile');
        setLoading(false);
        return;
      }

      // Update invite code usage
      await supabase
        .from('invite_codes')
        .update({ 
          current_uses: inviteData.current_uses + 1,
          used_by: user.id,
          used_at: new Date().toISOString()
        })
        .eq('id', inviteData.id);

      onSuccess();
    } catch (err) {
      setError('An error occurred');
      setLoading(false);
    }
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
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
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
