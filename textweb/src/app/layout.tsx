import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../providers/AuthProvider';
import { cn } from '../lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Club Mitos',
  description: 'Club Mitos — davetle giriş yapılan, kurucu ve operatör topluluğu.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={cn('min-h-screen bg-slate-50 font-sans antialiased', inter.variable)}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-purple-500" />
                  <span className="text-lg font-semibold tracking-tight text-slate-900">Club Mitos</span>
                </div>
                <div className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
                  <a href="/profile" className="hover:text-slate-900">
                    Profil
                  </a>
                  <a href="/admin" className="hover:text-slate-900">
                    Admin
                  </a>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-white">
              <div className="container flex flex-col gap-2 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Club Mitos</p>
                <p>Supabase + Next.js 16 + Tailwind</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
