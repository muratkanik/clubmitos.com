'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Image from 'next/image';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
        if (!data?.is_admin) router.push('/profile');
        setIsAdmin(data?.is_admin || false);
        if (data?.is_admin) loadData();
      });
    }
  }, [user, loading, router]);

  const loadData = async () => {
    const { data: usersData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    const { data: codesData } = await supabase.from('invite_codes').select('*').order('created_at', { ascending: false });
    setUsers(usersData || []);
    setCodes(codesData || []);
  };

  const generateCode = async () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    await supabase.from('invite_codes').insert({ code, created_by: user!.id });
    loadData();
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    await supabase.from('profiles').update({ is_admin: !currentStatus }).eq('id', userId);
    loadData();
  };

  if (loading || !isAdmin) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-serif text-[#d4af37]">Admin Dashboard</h1>
            <button onClick={generateCode} className="px-6 py-3 bg-[#d4af37] text-[#0f172a] rounded-lg hover:bg-[#f0c857]">
              Generate Code
            </button>
          </div>

          {/* Users */}
          <div className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/20">
            <h2 className="text-2xl font-serif text-[#d4af37] mb-4">Members</h2>
            <div className="space-y-4">
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  {u.profile_photo_url ? (
                    <Image src={u.profile_photo_url} alt="Profile" width={48} height={48} className="rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center">{u.id[0]}</div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">{u.id}</p>
                  </div>
                  <button onClick={() => toggleAdmin(u.id, u.is_admin)} className={`px-4 py-2 rounded ${u.is_admin ? 'bg-[#d4af37] text-[#0f172a]' : 'bg-white/10 text-gray-400'}`}>
                    {u.is_admin ? 'Admin' : 'Member'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Codes */}
          <div className="p-6 bg-white/5 rounded-2xl border border-[#d4af37]/20">
            <h2 className="text-2xl font-serif text-[#d4af37] mb-4">Invite Codes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {codes.map((c) => (
                <div key={c.id} className={`p-4 rounded-lg ${c.used_by ? 'bg-white/5' : 'bg-[#d4af37]/10'}`}>
                  <p className="text-xl font-mono text-[#d4af37]">{c.code}</p>
                  <p className="text-xs text-gray-400">{c.used_by ? 'Used' : 'Available'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
