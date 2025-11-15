import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import AdminStats from '@/components/admin/AdminStats';
import UserManagement from '@/components/admin/UserManagement';
import InviteCodeManagement from '@/components/admin/InviteCodeManagement';

export default function Admin() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [users, setUsers] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkAdmin();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', user?.id)
        .single();
      
      if (error) {
        console.error('Error checking admin:', error);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(data?.role === 'admin');
      if (data?.role === 'admin') {
        await loadUsers();
        await loadCodes();
      }
    } catch (err) {
      console.error('Exception in checkAdmin:', err);
      setIsAdmin(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-[#d4af37] text-center">
          <div className="text-2xl mb-2">Loading...</div>
          <div className="text-sm text-gray-400">Checking admin permissions...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-[#d4af37] text-center">
          <div className="text-2xl mb-2">Not Logged In</div>
          <div className="text-sm text-gray-400">Please log in to access the admin panel.</div>
        </div>
      </div>
    );
  }


  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-[#d4af37]">
        {t('errorPermission')}
      </div>
    );
  }

  const totalMembers = users.filter(u => u.status === 'member').length;
  const pendingApprovals = users.filter(u => u.status === 'candidate').length;
  const activeInviteCodes = codes.filter(c => c.current_uses < c.max_uses).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-[#d4af37] mb-8">{t('adminPanel')}</h1>
        
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
    </div>
  );
}
