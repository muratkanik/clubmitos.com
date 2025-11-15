import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Copy, XCircle, CheckCircle } from 'lucide-react';

interface InviteCode {
  id: string;
  code: string;
  used_by: string | null;
  used_at: string | null;
  created_at: string;
  max_uses: number;
  current_uses: number;
}

interface InviteCodeManagementProps {
  codes: InviteCode[];
  onUpdate: () => void;
  userId: string;
}

export default function InviteCodeManagement({ codes, onUpdate, userId }: InviteCodeManagementProps) {
  const [creating, setCreating] = useState(false);
  const [maxUses, setMaxUses] = useState(1);

  const generateCode = async () => {
    setCreating(true);
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    await supabase.from('invite_codes').insert({ 
      code, 
      created_by: userId,
      max_uses: maxUses,
      current_uses: 0
    });
    onUpdate();
    setCreating(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const deactivateCode = async (id: string) => {
    await supabase.from('invite_codes').update({ max_uses: 0 }).eq('id', id);
    onUpdate();
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-[#d4af37]">Invite Code Management</h2>
        <div className="flex gap-3 items-center">
          <input type="number" min="1" value={maxUses} onChange={(e) => setMaxUses(parseInt(e.target.value))} className="w-20 px-3 py-2 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white" placeholder="Uses" />
          <button onClick={generateCode} disabled={creating} className="px-4 py-2 bg-[#d4af37] text-[#0f172a] rounded-lg hover:bg-[#f0c857] flex items-center gap-2 disabled:opacity-50">
            <Plus className="w-4 h-4" />
            Generate Code
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {codes.map((code) => (
          <div key={code.id} className="p-4 bg-white/5 rounded-lg border border-[#d4af37]/10">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[#d4af37] font-mono text-lg font-bold">{code.code}</p>
              <button onClick={() => copyCode(code.code)} className="text-gray-400 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">Uses: {code.current_uses}/{code.max_uses}</p>
              <p className={code.current_uses >= code.max_uses ? 'text-red-400' : 'text-green-400'}>
                {code.current_uses >= code.max_uses ? 'Exhausted' : 'Active'}
              </p>
            </div>
            {code.current_uses < code.max_uses && (
              <button onClick={() => deactivateCode(code.id)} className="mt-3 w-full px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 flex items-center justify-center gap-1 text-sm">
                <XCircle className="w-4 h-4" />
                Deactivate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
