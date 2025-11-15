import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface User {
  id: string;
  email: string;
  full_name: string;
  status: string;
  payment_status: string;
  payment_amount: number;
  created_at: string;
}

interface UserManagementProps {
  users: User[];
  onUpdate: () => void;
}

export default function UserManagement({ users, onUpdate }: UserManagementProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.status === filter);

  const approveToMember = async (userId: string) => {
    await supabase.from('users').update({ status: 'member' }).eq('id', userId);
    onUpdate();
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending_email: 'text-yellow-400',
      guest: 'text-gray-400',
      candidate: 'text-blue-400',
      member: 'text-green-400',
      suspended: 'text-red-400'
    };
    return colors[status] || 'text-gray-400';
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-[#d4af37]">User Management</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white">
          <option value="all">All Users</option>
          <option value="pending_email">Pending Email</option>
          <option value="guest">Guest</option>
          <option value="candidate">Candidate</option>
          <option value="member">Member</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d4af37]/20">
              <th className="text-left py-3 px-4 text-gray-400">Email</th>
              <th className="text-left py-3 px-4 text-gray-400">Name</th>
              <th className="text-left py-3 px-4 text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-gray-400">Payment</th>
              <th className="text-left py-3 px-4 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="py-3 px-4 text-white">{user.email}</td>
                <td className="py-3 px-4 text-white">{user.full_name}</td>
                <td className={`py-3 px-4 ${getStatusColor(user.status)}`}>{user.status}</td>
                <td className="py-3 px-4">
                  <span className={user.payment_status === 'paid' ? 'text-green-400' : 'text-yellow-400'}>
                    {user.payment_amount ? `$${user.payment_amount}` : '-'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {user.status === 'candidate' && (
                    <button onClick={() => approveToMember(user.id)} className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
