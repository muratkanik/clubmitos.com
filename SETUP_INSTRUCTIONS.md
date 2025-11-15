# Club Mitos - Setup Instructions

## Prerequisites
- Node.js 18+ and pnpm
- Supabase account (already configured)
- Google Cloud Console project for OAuth

## 🌐 Web Setup

### 1. Install Dependencies
```bash
cd web
pnpm install
```

### 2. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://qiaxjdumtbgizmbpjeek.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYXhqZHVtdGJnaXptYnBqZWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzU5NzQsImV4cCI6MjA3ODcxMTk3NH0.aO-9RrwRu86mbCI7NzNNSWaxu2fN-f-orwn7RCq62DI
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
pnpm dev
```
Open http://localhost:3000

## 📱 Mobile Setup

### 1. Install Dependencies
```bash
cd mobile
pnpm install
```

### 2. Start Expo
```bash
pnpm start
```

### 3. Run on Device
- Scan QR code with Expo Go app
- Or press `i` for iOS simulator
- Or press `a` for Android emulator

## 🔧 Supabase Configuration

### Google OAuth Setup
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add redirect URLs:
   - Development: `http://localhost:3000/auth/v1/callback`
   - Production: `https://clubmitos.com/auth/v1/callback`
   - Mobile: `clubmitos://`

### Storage Policies (Already Applied)
```sql
-- Allow users to upload own photos
CREATE POLICY "Users can upload own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');
```

### Create First Admin
After first user signs up:
```sql
UPDATE profiles SET is_admin = true WHERE id = '<user-id-from-auth-users>';
```

### Generate Initial Invite Codes
```sql
INSERT INTO invite_codes (code, created_by)
VALUES 
  ('MITOS001', '<admin-user-id>'),
  ('MITOS002', '<admin-user-id>'),
  ('MITOS003', '<admin-user-id>');
```

## 🧪 Testing Flow

1. **Login**: Visit `/login` → Click "Continue with Google"
2. **Invite Code**: Enter valid code (e.g., MITOS001)
3. **Profile**: Upload profile photo
4. **Admin** (if admin): Generate codes, manage users

## 🚨 Troubleshooting

### Web Issues
- **"Invalid API key"**: Check `.env.local` variables
- **OAuth redirect fails**: Verify redirect URL in Supabase
- **Image upload fails**: Check storage bucket exists

### Mobile Issues
- **"Network request failed"**: Check Supabase URL
- **OAuth doesn't work**: Verify mobile redirect URL
- **Camera not working**: Check permissions in app.json

## 📚 Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
