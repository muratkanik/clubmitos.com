# Club Mitos - Production Deployment Guide

## ✅ FIXES COMPLETED

### Web App (Next.js)
- ✅ Fixed Supabase client with correct anon key
- ✅ Fixed Google OAuth redirect to https://clubmitos.com/auth/callback
- ✅ Created OAuth callback handler at /auth/callback/route.ts
- ✅ Fixed invite code validation to use `users` table with max_uses check
- ✅ Fixed profile page to use `users` table instead of `profiles`
- ✅ Fixed photo upload to update `users.profile_photo_url`
- ✅ Fixed admin panel to check `users.role = 'admin'`
- ✅ Added proper error handling and loading states

### Mobile App (Expo)
- ✅ Fixed Supabase config with correct anon key

## 🚀 DEPLOYMENT

### Web (Vercel)
```bash
vercel --prod
```
Environment variables already set in .env.example

### Mobile (EAS)
```bash
cd mobile
eas build --platform all
eas submit --platform all
```

## 🔑 FIRST ADMIN SETUP

After first user signs up, run in Supabase SQL Editor:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 📱 GOOGLE OAUTH SETUP

In Google Cloud Console, add authorized redirect URIs:
- https://clubmitos.com/auth/callback
- https://qiaxjdumtbgizmbpjeek.supabase.co/auth/v1/callback

## ✨ FEATURES WORKING

- Google OAuth login
- Invite code validation with max_uses
- Profile photo upload to Supabase Storage
- Admin panel with user management
- Invite code generation (8-char)
- User status management (pending_email, guest, candidate, member)
- Payment tracking
- Responsive design
