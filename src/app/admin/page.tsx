'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import InviteCodeManagement from '@/components/admin/InviteCodeManagement';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      checkAdmin();
    }
  }, [user, authLoading, router]);

  const checkAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', user?.id)
        .single();
      
      if (error || !data) {
        console.error('Error checking admin:', error);
        router.push('/profile');
        return;
      }

      if (data.role !== 'admin') {
        router.push('/profile');
        return;
      }

      setIsAdmin(true);
      await loadUsers();
      await loadCodes();
    } catch (err) {
      console.error('Exception in checkAdmin:', err);
      router.push('/profile');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    setUsers(data || []);
  };

  const loadCodes = async () => {
    const { data } = await supabase.from('invite_codes').select('*').order('created_at', { ascending: false });
    setCodes(data || []);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-[#d4af37]">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const totalMembers = users.filter(u => u.status === 'member').length;
  const pendingApprovals = users.filter(u => u.status === 'candidate').length;
  const activeInviteCodes = codes.filter(c => c.current_uses < c.max_uses).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif text-[#d4af37] mb-8">Admin Panel</h1>
          
          <AdminStats 
            totalMembers={totalMembers}
            pendingApprovals={pendingApprovals}
            activeInviteCodes={activeInviteCodes}
          />

          <div className="space-y-8">
            <UserManagement users={users} onUpdate={loadUsers} />
            <InviteCodeManagement codes={codes} onUpdate={loadCodes} userId={user?.id || ''} />
          </div>
        </div>
      </main>
    </>
  );
}
