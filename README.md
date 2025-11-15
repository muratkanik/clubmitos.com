# Club Mitos - Luxury Membership Platform

Ultra-premium, invite-only club platform with Google OAuth authentication.

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Design**: Playfair Display + Inter, Navy/Gold theme

## Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

## Features
- Google OAuth with invite code validation
- Profile photo upload to Supabase Storage
- Admin dashboard with user management
- Invite code generation system
- Luxury animations and design

## Deployment
Deploy to Vercel with environment variables configured.

## Admin Access
First user must be manually set as admin in Supabase:
```sql
UPDATE profiles SET is_admin = true WHERE id = 'user-id';
```

## Database Schema
- `profiles`: User profiles with admin flag
- `invite_codes`: Referral codes with usage tracking
- `profile-photos`: Storage bucket for avatars
