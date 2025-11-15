import { Users, UserCheck, Ticket } from 'lucide-react';

interface AdminStatsProps {
  totalMembers: number;
  pendingApprovals: number;
  activeInviteCodes: number;
}

export default function AdminStats({ totalMembers, pendingApprovals, activeInviteCodes }: AdminStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#d4af37]/20 rounded-lg">
            <Users className="w-8 h-8 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Members</p>
            <p className="text-3xl font-bold text-white">{totalMembers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <UserCheck className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pending Approvals</p>
            <p className="text-3xl font-bold text-white">{pendingApprovals}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Ticket className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Invite Codes</p>
            <p className="text-3xl font-bold text-white">{activeInviteCodes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
