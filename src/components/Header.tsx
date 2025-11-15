import { Link } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from './Logo';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Header() {
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-lg border-b border-[#d4af37]/20 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('about')}</a>
          <a href="#activities" onClick={(e) => scrollToSection(e, 'activities')} className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('events')}</a>
          <a href="#membership" onClick={(e) => scrollToSection(e, 'membership')} className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('membershipTerms')}</a>
          <Link to="/kvkk" className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('kvkk')}</Link>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('contact')}</a>
          <Link to="/invite-code" className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('joinUs')}</Link>

        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] rounded-lg border border-[#d4af37]/30 shadow-md">
            <Label htmlFor="language-switch" className="text-sm font-bold text-gray-300 cursor-pointer select-none">
              EN
            </Label>
            <Switch
              id="language-switch"
              checked={language === 'tr'}
              onCheckedChange={(checked) => setLanguage(checked ? 'tr' : 'en')}
              className="data-[state=checked]:bg-[#d4af37] data-[state=unchecked]:bg-blue-600"

            />
            <Label htmlFor="language-switch" className="text-sm font-bold text-gray-300 cursor-pointer select-none">
              TR
            </Label>
          </div>

          {user ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('profile')}</Link>
              <Link to="/admin" className="text-gray-300 hover:text-[#d4af37] transition-colors font-medium">{t('admin')}</Link>
              <button onClick={signOut} className="px-4 py-2 bg-[#d4af37]/10 text-[#d4af37] rounded-lg hover:bg-[#d4af37]/20 transition-all font-medium">
                {t('logout')}
              </button>
            </>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-[#d4af37] text-[#0f172a] rounded-lg hover:bg-[#f0c857] transition-all font-semibold shadow-lg">
              {t('login')}
            </Link>
          )}
        </div>
      </nav>
    </header>

  );
}

