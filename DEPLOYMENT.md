# Club Mitos Deployment Guide

## Web Deployment (Vercel)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Go to vercel.com and import your repository
- Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL`
- Deploy

3. **Configure Custom Domain**
- Add `clubmitos.com` in Vercel domain settings
- Update DNS records

## Mobile Deployment (EAS Build)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
eas login
```

2. **Configure EAS**
```bash
cd mobile
eas build:configure
```

3. **Build for iOS**
```bash
eas build --platform ios
```

4. **Build for Android**
```bash
eas build --platform android
```

5. **Submit to App Stores**
```bash
eas submit --platform ios
eas submit --platform android
```

## Supabase Configuration

1. **Google OAuth Setup**
- Go to Supabase Dashboard → Authentication → Providers
- Enable Google
- Add authorized redirect URLs:
  - `https://clubmitos.com/auth/v1/callback`
  - `clubmitos://`

2. **Storage Policies**
```sql
-- Allow authenticated users to upload their own photos
CREATE POLICY "Users can upload own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');
```

3. **Create First Admin**
```sql
-- After first user signs up, make them admin
UPDATE profiles SET is_admin = true WHERE id = '<user-id>';
```

## Post-Deployment

1. Generate initial invite codes via admin panel
2. Test authentication flow
3. Verify photo uploads work
4. Test mobile app on TestFlight/Google Play Internal Testing
