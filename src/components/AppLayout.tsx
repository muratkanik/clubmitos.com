import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Users, Calendar, Book, Music, Plane, Heart, Sparkles, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Header from './Header';

export default function AppLayout() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', gender: '', maritalStatus: '', education: '', birthdate: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [siteSettings, setSiteSettings] = useState({ address: '', email: '', phone: '' });

  useEffect(() => {
    fetchSiteSettings();
  }, [language]);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      const settings: any = {};
      data?.forEach((item: any) => {
        if (item.key === 'footer_address') settings.address = language === 'tr' ? item.value_tr : item.value_en;
        if (item.key === 'footer_email') settings.email = item.value_tr;
        if (item.key === 'footer_phone') settings.phone = item.value_tr;
      });
      setSiteSettings(settings);
    } catch (err) {
      console.error('Error fetching site settings:', err);
    }
  };


  const activities = [
    { icon: Users, key: 'activity1' },
    { icon: Calendar, key: 'activity2' },
    { icon: Plane, key: 'activity3' },
    { icon: Plane, key: 'activity4' },
    { icon: Heart, key: 'activity5' },
    { icon: Book, key: 'activity6' },
    { icon: Music, key: 'activity7' },
    { icon: Sparkles, key: 'activity8' }
  ];

  const requirements = [
    { key: 'req1Title', desc: 'req1Desc' },
    { key: 'req2Title', desc: 'req2Desc' },
    { key: 'req3Title', desc: 'req3Desc' },
    { key: 'req4Title', desc: 'req4Desc' },
    { key: 'req5Title', desc: 'req5Desc' },
    { key: 'req6Title', desc: 'req6Desc' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Gender: ${formData.gender}, Marital: ${formData.maritalStatus}, Education: ${formData.education}, Birthdate: ${formData.birthdate}, Message: ${formData.message}`
        }]);

      if (submitError) throw submitError;
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', gender: '', maritalStatus: '', education: '', birthdate: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || t('errorSubmitting'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-20">

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://d64gsuwffb70l.cloudfront.net/69182fda1b8b8c653c1d3f2f_1763228254819_8dfc1acb.webp" alt="Hero" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-[#d4af37] mb-6">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">{t('heroSubtitle')}</p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">{t('heroDescription')}</p>
          <Link to="/invite-code" className="inline-block px-12 py-4 bg-[#d4af37] text-[#0f172a] font-semibold text-lg rounded-lg hover:bg-[#f0c857] transition-all">
            {t('joinNow')}
          </Link>

        </div>
      </section>


      <section id="about" className="py-24 px-4 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-[#d4af37] mb-12">{t('aboutTitle')}</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>{t('aboutText1')}</p>
            <p>{t('aboutText2')}</p>
            <p className="text-xl text-[#d4af37] font-semibold">{t('aboutQuestion')}</p>
            <p>{t('aboutActivities')}</p>
          </div>
        </div>
      </section>

      <section id="activities" className="py-24 px-4 bg-[#1e293b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-[#d4af37] mb-4">{t('activitiesTitle')}</h2>
          <p className="text-xl text-center text-gray-400 mb-16">{t('activitiesSubtitle')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all">
                <activity.icon className="w-10 h-10 text-[#d4af37] mb-4" />
                <h3 className="text-lg font-semibold text-gray-200">{t(activity.key as any)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="py-24 px-4 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-[#d4af37] mb-4">{t('membershipTitle')}</h2>
          <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">{t('membershipSubtitle')}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requirements.map((req, idx) => (
              <div key={idx} className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-[#d4af37]/20">
                <CheckCircle className="w-10 h-10 text-[#d4af37] mb-4" />
                <h3 className="text-xl font-serif text-[#d4af37] mb-3">{t(req.key as any)}</h3>
                <p className="text-gray-400">{t(req.desc as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4 bg-[#1e293b]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-[#d4af37] mb-4">{t('contactTitle')}</h2>
          <p className="text-center text-gray-400 mb-12">{t('contactSubtitle')}</p>
          {submitted && <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-center">{t('messageSent')}</div>}
          {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={formData.name} placeholder={t('name')} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" value={formData.email} placeholder={t('email')} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="tel" value={formData.phone} placeholder={t('phone')} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <select value={formData.gender} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option value="">{t('gender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </select>
            <input type="date" value={formData.birthdate} placeholder="DD-MM-YYYY" className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, birthdate: e.target.value})} />
            <select value={formData.maritalStatus} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}>
              <option value="">{t('maritalStatus')}</option>
              <option value="married">{t('married')}</option>
              <option value="single">{t('single')}</option>
              <option value="widowed">{t('widowed')}</option>
              <option value="divorced">{t('divorced')}</option>
            </select>
            <select value={formData.education} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white focus:border-[#d4af37] focus:outline-none" required onChange={(e) => setFormData({...formData, education: e.target.value})}>
              <option value="">{t('education')}</option>
              <option value="masters">{t('masters')}</option>
              <option value="university">{t('university')}</option>
              <option value="highSchool">{t('highSchool')}</option>
              <option value="elementary">{t('elementary')}</option>
              <option value="other">{t('other')}</option>
            </select>
            <textarea value={formData.message} placeholder={t('message')} rows={4} className="w-full px-4 py-3 bg-white/5 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
            <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#d4af37] text-[#0f172a] font-semibold rounded-lg hover:bg-[#f0c857] transition-all disabled:opacity-50">
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#0f172a] border-t border-[#d4af37]/20 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#d4af37]" />
              <span className="text-sm">{siteSettings.address || 'Örnek Mahallesi, Deneme Caddesi No: 123'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#d4af37]" />
              <a href={`mailto:${siteSettings.email}`} className="text-sm hover:text-[#d4af37]">{siteSettings.email || 'info@clubmitos.com'}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#d4af37]" />
              <a href={`tel:${siteSettings.phone}`} className="text-sm hover:text-[#d4af37]">{siteSettings.phone || '+90 555 123 45 67'}</a>
            </div>
          </div>
          <p className="text-gray-500 text-sm">© 2019. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
      </div>
    </>
  );
}

