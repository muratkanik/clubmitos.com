import Link from 'next/link';
import { ArrowRight, Calendar, Globe2, HeartHandshake, MapPin, ShieldCheck, Sparkles, Users, Waves, Wine } from 'lucide-react';
import { Button } from '../components/ui/button';

const heroVideo = 'https://cdn.coverr.co/videos/coverr-friends-having-fun-at-a-party-6403/1080p.mp4';

const experiences = [
  { title: 'Seçili sofralar', description: 'Altı kişilik konsept yemekler ve tadım geceleri ile bağ kuran masalar.' },
  { title: 'Atölye & kulüpler', description: 'Dans, seramik, yoga, kitap kulübü ve yaratıcı üretim buluşmaları.' },
  { title: 'Keşif gezileri', description: 'Günübirlik doğa yürüyüşleri, tekne turları ve hafta sonu kaçamakları.' },
  { title: 'Sahne ve ritim', description: 'Canlı konserler, özel DJ setleri, performans sanatları deneyimleri.' },
  { title: 'Impact sohbetleri', description: 'Kurucu ve yatırımcı sohbetleri, erken aşama startup sunumları.' },
  { title: 'Şehir ritüelleri', description: 'Running crew, sabah deniz buluşmaları ve gece yarısı serinlemeleri.' }
];

const membershipRules = [
  {
    title: 'Referans + davet',
    description: 'Her aday, mevcut üyelerden aldığı tek kullanımlık davet kodu ile başlar.',
    icon: <ShieldCheck className="h-5 w-5 text-brand" />
  },
  {
    title: 'Profesyonel denge',
    description: 'Topluluk 30-55 yaş aralığındaki üretken profesyonellerden seçilir.',
    icon: <Users className="h-5 w-5 text-brand" />
  },
  {
    title: 'Uyum süreci',
    description: 'Katılımcılar iki etkinlik misafir olarak yer alır, ardından üyeliğe hak kazanır.',
    icon: <Calendar className="h-5 w-5 text-brand" />
  },
  {
    title: 'Karşılıklı saygı',
    description: 'İçerik, alan ve zaman paylaşımında net sınırlar, sıfır toleranslı güvenlik.',
    icon: <HeartHandshake className="h-5 w-5 text-brand" />
  },
  {
    title: 'Denge & çeşitlilik',
    description: 'Cinsiyet, sektör ve kişilik dengesini koruyan kürasyon süreci.',
    icon: <Globe2 className="h-5 w-5 text-brand" />
  },
  {
    title: 'Aktif katılım',
    description: 'Her üye yılda en az dört fiziksel buluşmaya katılır, topluluğu besler.',
    icon: <Waves className="h-5 w-5 text-brand" />
  }
];

const contact = [
  { label: 'Lokasyon', value: 'İstanbul & global buluşmalar', icon: <MapPin className="h-4 w-4" /> },
  { label: 'İletişim', value: 'concierge@clubmitos.com', icon: <Sparkles className="h-4 w-4" /> },
  { label: 'Destek hattı', value: '+90 212 000 00 00', icon: <Wine className="h-4 w-4" /> }
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <section id="hero" className="relative min-h-[85vh] overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-slate-900/90" />
        <div className="container relative z-10 flex min-h-[85vh] flex-col items-start justify-center gap-8 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Davetle giriş yapılan kulüp
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            Club Mitos, şehrin ritmini paylaşan kurucu, kreatif ve operatörleri aynı masada buluşturur.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Google OAuth + davet kodu olmadan içeri giremezsiniz. Supabase altyapısı ile yönetilen, video odaklı açılış deneyimine sahip premium topluluk
            platformu.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              <Link href="/login" className="inline-flex items-center gap-2">
                Davet koduyla giriş
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/#apply">Üyelik başvurusu</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="vision" className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase text-brand">Kavramsal yaklaşım</p>
          <h2 className="text-3xl font-semibold text-slate-900">Şehrin enerjisini taşıyan, zamansız bir topluluk deneyimi</h2>
          <p className="text-lg text-slate-600">
            Club Mitos; işini tutkuyla yapanların, yeni arkadaşlıklar kurmak isteyenlerin ve yüksek frekansta hayatı yaşayanların bir araya geldiği
            konseptli etkinlikler serisidir. Gece kulübü, sanat evi, doğa kaçamağı ve yatırım kulübü çizgileri bu çatının içinde buluşur.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Kurgu + kürasyon', text: 'Her etkinlik temalı, kapasite sınırlı ve deneyim tasarımcıları tarafından kurgulanır.' },
              { title: 'Teknoloji omurgası', text: 'Supabase Auth, RLS ve Storage ile güvenli kimlik, fotoğraf ve davet kodu yönetimi.' }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-900">Davet zinciri nasıl işler?</h3>
            <ol className="space-y-4 text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">1. Davet kodu doğrulanır.</span> Kodlar Supabase servis anahtarı ile kontrol edilir ve 15
                dakika boyunca tarayıcıya güvenli olarak saklanır.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2. Google OAuth tamamlanır.</span> Güvenli redirect ve session yönetimi ile üyeler profil
                sayfasına aktarılır.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3. Profil onboarding.</span> Fotoğraf yükleme, rol & davet kodu üretme işlemleri profil ve
                admin ekranlarında yapılır.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section id="experiences" className="container space-y-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase text-brand">Neler yapıyoruz?</p>
          <h2 className="text-3xl font-semibold text-slate-900">Her ay küratörlü deneyim takvimi</h2>
          <p className="text-slate-600">Gündüz doğa ve sanat, gece ritim ve networking. Şehrin farklı yüzlerini birlikte keşfediyoruz.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <div key={experience.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{experience.title}</h3>
              <p className="text-sm text-slate-600">{experience.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="membership" className="bg-slate-900 py-16 text-white">
        <div className="container space-y-10">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Üyelik kuralları</p>
            <h2 className="text-3xl font-semibold">Club Mitos’a katılmak için net kriterler</h2>
            <p className="text-slate-300">Denge, güven ve yüksek frekanslı enerji için davet zincirini ciddiye alıyoruz.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membershipRules.map((rule) => (
              <div key={rule.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">{rule.icon}</div>
                <h3 className="text-xl font-semibold">{rule.title}</h3>
                <p className="text-sm text-slate-200">{rule.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/20 via-sky-500/20 to-purple-600/20 p-8 text-center shadow-2xl">
            <p className="text-lg text-white">
              “Club Mitos, yüzlerce üyeyi referans kodu olmadan içeri almayan, güvenlik seviyesi yüksek deneyim kulübüdür. Admin panelinden davet kodu
              üret, Supabase RLS ile tüm hareketleri takip et.”
            </p>
          </div>
        </div>
      </section>

      <section id="apply" className="container grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase text-brand">Üyelik başvurusu</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Formu gönder, davet görüşmemizi planlayalım</h2>
          <p className="mt-3 text-slate-600">Bilgileriniz yalnızca Supabase veritabanımızda saklanır. Google OAuth hesabınızla eşleşmelidir.</p>
          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            {['Adınız Soyadınız', 'E-posta', 'Telefon', 'Doğum yılı', 'Sektör', 'İlgi alanı'].map((placeholder) => (
              <input
                key={placeholder}
                placeholder={placeholder}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none ring-brand/20 focus:ring-2 md:col-span-1"
                required
              />
            ))}
            <textarea
              placeholder="Topluluğa nasıl katkı sağlamak istersiniz?"
              className="md:col-span-2 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none ring-brand/20 focus:ring-2"
              rows={4}
            />
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" required className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" /> KVKK metnini okudum.
              </label>
              <Button type="submit" className="w-full md:w-auto">
                Başvuruyu gönder
              </Button>
            </div>
          </form>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-lg">
          <h3 className="text-2xl font-semibold">Concierge ekibi</h3>
          <p className="mt-3 text-slate-300">Her sorunuz için 09.00-23.00 arasında yanıt veriyoruz.</p>
          <div className="mt-8 space-y-5">
            {contact.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20">{item.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-300">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
            <p>
              Club Mitos, veri güvenliği için Supabase Storage ve RLS politikaları kullanır. Profil fotoğraflarınızı `profile-photos/{userId}/avatar.jpg`
              yoluna yükler, yalnızca size ve adminlere açarız.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="container">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 px-8 py-12 text-white shadow-2xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Son söz</p>
              <h2 className="mt-2 text-3xl font-semibold">Mitos kabilesine hoş geldiniz.</h2>
              <p className="mt-3 text-slate-200">Google hesabınız hazır, davet kodunuz doğruysa kulübün kapıları açılıyor.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/login" className="inline-flex items-center gap-2">
                  Giriş yap
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/admin">Admin paneli</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
