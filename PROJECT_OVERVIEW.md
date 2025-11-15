# Club Mitos - Project Overview

## 🎯 Project Description
Ultra-luxury, invite-only membership platform inspired by Club Mitos. Features Google OAuth authentication with mandatory invite code validation, profile management, and comprehensive admin controls.


## 🏗️ Architecture

### Web Application (Next.js)
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & auth provider
│   ├── page.tsx            # Landing page with hero & benefits
│   ├── login/page.tsx      # Google OAuth login
│   ├── invite-code/page.tsx # Code validation
│   ├── profile/page.tsx    # User profile & photo upload
│   └── admin/page.tsx      # Admin dashboard
├── components/
│   ├── Logo.tsx            # Mitos logo component
│   ├── Header.tsx          # Navigation header
│   ├── UploadPhoto.tsx     # Photo upload component
│   └── InviteCodeInput.tsx # Code input form
├── providers/
│   └── AuthProvider.tsx    # Auth context
└── lib/
    └── supabase.ts         # Supabase client
```

### Mobile Application (Expo)
```
app/
├── _layout.tsx             # Root layout
├── login.tsx               # Login screen
├── invite-code.tsx         # Code validation
└── (tabs)/
    ├── _layout.tsx         # Tab navigation
    ├── index.tsx           # Home screen
    ├── profile.tsx         # Profile screen
    └── admin.tsx           # Admin screen
components/
└── UploadPhoto.tsx         # Photo upload with camera
lib/
└── supabase.ts             # Supabase client with SecureStore
```

## 🎨 Design System

### Colors
- **Navy**: `#0f172a` - Primary background
- **Gold**: `#d4af37` - Accent color
- **White**: Text and borders

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Glass-morphism cards: `bg-white/5 backdrop-blur-lg`
- Gold borders: `border-[#d4af37]/20`
- Rounded corners: `rounded-lg` or `rounded-2xl`

## 🔐 Authentication Flow

1. User clicks "Continue with Google"
2. Google OAuth redirects to `/invite-code`
3. User enters 8-character invite code
4. Code validated against `invite_codes` table
5. Profile created in `profiles` table
6. Redirect to `/profile`

## 🗄️ Database Schema

### profiles
- `id` (UUID, FK to auth.users)
- `profile_photo_url` (TEXT)
- `is_admin` (BOOLEAN)
- `created_at` (TIMESTAMPTZ)

### invite_codes
- `id` (UUID)
- `code` (TEXT, unique)
- `used_by` (UUID, FK to profiles)
- `used_at` (TIMESTAMPTZ)
- `created_by` (UUID, FK to profiles)
- `created_at` (TIMESTAMPTZ)

## 📦 Storage
- Bucket: `profile-photos`
- Path: `{user_id}/avatar.jpg`
- Public read access

## 🚀 Key Features

### Web
✅ Google OAuth authentication
✅ Invite code validation
✅ Profile photo upload (drag & drop)
✅ Admin dashboard
✅ User management (toggle admin status)
✅ Invite code generation
✅ Responsive design

### Mobile
✅ Google OAuth via WebBrowser
✅ Invite code validation
✅ Camera/gallery photo upload
✅ Tab navigation
✅ Admin dashboard
✅ Native styling with NativeWind

## 🔒 Security

### Row Level Security (RLS)
- Users can read/update own profile
- Admins have full access to all profiles
- Anyone can read unused invite codes
- Only admins can create codes
- Admins can view all codes

## 📱 Deployment

### Web (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy to clubmitos.com

### Mobile (EAS Build)
1. Configure EAS
2. Build for iOS/Android
3. Submit to App Store/Play Store

## 🎯 Admin Workflow

1. First user signs up via invite code
2. Manually set as admin in Supabase:
   ```sql
   UPDATE profiles SET is_admin = true WHERE id = 'user-id';
   ```
3. Admin can:
   - Generate invite codes
   - View all members
   - Toggle admin status
   - View code usage

## 🔗 URLs
- **Web**: https://clubmitos.com
- **Supabase**: https://qiaxjdumtbgizmbpjeek.supabase.co
- **Mobile Scheme**: `clubmitos://`
