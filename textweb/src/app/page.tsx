import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const pillars = [
  {
    title: 'Kurucu topluluk',
    description: 'Operator, kurucu ve yatırımcıların kapalı devre olarak buluştuğu, yüksek inançlı oda.',
    icon: <Sparkles className="h-5 w-5 text-brand" />
  },
  {
    title: 'Tam güvenlik',
    description: 'Supabase Auth + RLS ile her aksiyon kullanıcı kimliğiyle korunur.',
    icon: <ShieldCheck className="h-5 w-5 text-brand" />
  },
  {
    title: 'Davet sistemi',
    description: 'Her üye tek seferlik kod üretir. Kodlar servis rolü ile doğrulanır.',
    icon: <ArrowRight className="h-5 w-5 text-brand" />
  }
];

export default function HomePage() {
  return (
    <div className="container py-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Badge className="inline-flex items-center gap-2 bg-white text-brand shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Kapalı topluluk
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Club Mitos: Davetle giriş yapılan kurucu & operator kolektifi.
          </h1>
          <p className="text-lg text-slate-600">
            Supabase, Next.js 16, Tailwind ve shadcn/ui üzerine kurulu; Google OAuth ve davet kodu olmadan kayıt kabul etmeyen bir deneyim.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/login" className="inline-flex items-center gap-2">
                Davet koduyla giriş
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admin">Admin Paneli</Link>
            </Button>
          </div>
          <p className="text-sm text-slate-500">Google OAuth geri dönüş URL’i: https://clubmitos.com/auth/v1/callback</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-lg ring-1 ring-black/5 backdrop-blur">
          <div className="grid gap-6">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="border-none bg-slate-50/80 shadow-none">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="rounded-full bg-white p-3 shadow ring-1 ring-slate-200">{pillar.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="text-sm text-slate-600">{pillar.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
