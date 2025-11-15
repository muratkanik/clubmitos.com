import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';
import UploadPhoto from '@/components/UploadPhoto';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profilePhotoUrl: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const inviteCode = sessionStorage.getItem('validInviteCode');
    if (!inviteCode) {
      navigate('/invite-code');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const inviteCode = sessionStorage.getItem('validInviteCode');
    if (!inviteCode) {
      setError('Geçerli davet kodu bulunamadı');
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('users')
      .insert([{
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        bio: formData.bio,
        profile_photo_url: formData.profilePhotoUrl,
        invite_code_used: inviteCode,
        status: 'pending_email'
      }])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    // Mark invite code as used
    await supabase
      .from('invite_codes')
      .update({ used_by: data.id, used_at: new Date().toISOString() })
      .eq('code', inviteCode);

    sessionStorage.removeItem('validInviteCode');
    setSuccess('Kayıt başarılı! Email adresinize onay linki gönderildi.');
    setTimeout(() => navigate('/login'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-8">
        <div className="flex justify-center mb-8"><Logo /></div>
        <h1 className="text-3xl font-serif text-[#d4af37] text-center mb-8">Kayıt Ol</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Ad Soyad"
            required
            className="w-full px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
          />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Telefon"
            required
            className="w-full px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
          />
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Tanıtım Yazısı"
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-[#d4af37]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
          />
          <UploadPhoto
            onUpload={(url) => setFormData({...formData, profilePhotoUrl: url})}
            currentUrl={formData.profilePhotoUrl}
          />
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full px-6 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all disabled:opacity-50"
          >
            {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </div>
  );
}
