# Club Mitos

Supabase (Postgres + Auth + Storage + RLS) ve Next.js 16 App Router üzerinde inşa edilen, sadece davet kodu ile girişe izin veren özel topluluk uygulaması.

## Teknoloji Yığını

- **Frontend**: Next.js 16, TypeScript, App Router, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Postgres, Edge Auth, RLS, Storage)
- **Auth**: Google OAuth (Supabase) + davet kodu zorunluluğu
- **Deployment**: Vercel + özel domain `clubmitos.com`

## Başlangıç

```bash
pnpm install
pnpm dev
```

> Node 18.18+ veya 20+ önerilir. Proje Next.js 16 özelliklerini (server actions, App Router) kullanır.

## Ortam Değişkenleri

`.env.example` dosyasını kopyalayın:

```bash
cp .env.example .env
```

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase projesi (qiaxjdumtbgizmbpjeek) URL’i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Sunucu tarafında** kullanılan service role key (server actions & Edge route’larında kullanılır, istemciye sızdırılmaz) |
| `NEXT_PUBLIC_SITE_URL` | OAuth dönüş URL’i (lokalde http://localhost:3000, prod’da https://clubmitos.com) |

## Mimari

- `src/lib/supabase.ts`: Browser, server ve service role için ayrı Supabase client oluşturucuları.
- `src/providers/AuthProvider.tsx`: Supabase SessionContext + davet kodu doğrulamasını tetikleyen client provider.
- `src/app/api/invite/verify`: Davet kodunu service role ile doğrular, 15 dakikalık HTTP-only `invite_code` cookie’si bırakır.
- `src/app/api/auth/ensure-profile`: Kullanıcı giriş yaptıktan sonra profil kaydını oluşturur, davet kodunu tüketir.
- `src/app/profile`: Fotoğraf yükleme (Supabase Storage `profile-photos/{user_id}/avatar.jpg`), rol/üyelik bilgisi.
- `src/app/admin`: Admin’ler için kullanıcı listesi, admin toggle ve davet kodu üretimi (RLS ile korunur).
- `src/components/ui/*`: shadcn/ui bileşenleri.

## Akış

1. Üye `/login` sayfasında davet kodunu doğrular (`/api/invite/verify`).
2. Doğrulama başarılıysa Google OAuth başlatılır (Supabase Hosted auth).
3. Auth dönüşünde `AuthProvider` otomatik olarak `/api/auth/ensure-profile` çağırır:
   - `profiles` tablosunda satır yoksa oluşturur.
   - Davet kodunu `invite_codes.used_by` alanına işler.
4. Üye artık `/profile` ve yetkisine göre `/admin` sayfalarına erişebilir.

## Storage

- Bucket: `profile-photos`
- Yol: `profile-photos/<user_id>/avatar.jpg`
- Yükleme `UploadPhoto.tsx` içinde yapılır, aynı zamanda `profiles.profile_photo_url` alanını günceller.

## RLS & Güvenlik

- `profiles` ve `invite_codes` tablolarında:
  - `own_profile` politikası kullanıcıya kendi kaydını yönetme izni verir.
  - `admin_full` politikası `profiles.is_admin = true` olan kullanıcıya tam yetki tanımlar.
- Davet kodunu doğrulamak için service role client kullanılır, böylece RLS kısıtları aşılır ancak sıradan kullanıcıya key sızmaz.

## Deploy

1. Vercel projesini Supabase URL/KEY ve service role ile yapılandırın (service role sadece Server Environment’a eklenmelidir).
2. `NEXT_PUBLIC_SITE_URL` değişkenini `https://clubmitos.com` olarak ayarlayın.
3. Supabase Auth > URL’lere `https://clubmitos.com/auth/v1/callback` değerini ekleyin.
4. `pnpm build` ile prod derlemesini doğrulayın.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Lokal geliştirme |
| `pnpm build` | Prod build |
| `pnpm start` | Prod server |
| `pnpm lint` | ESLint |

## Notlar

- Admin panelindeki tüm aksiyonlar server action üzerinden çalışır; Supabase RLS kuralları ihlal edilmez.
- `InviteCodeInput` yalnızca doğrulanmış kod sonrası Google OAuth butonunu aktifleştirir.
- Yeni bileşenler shadcn/ui stil rehberine göre oluşturuldu (button, badge, card, table, input, label, avatar).
