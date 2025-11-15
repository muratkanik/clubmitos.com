# Club Mitos - Deployment Guide

## Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details and create

### 2. Run Database Migrations
1. Go to SQL Editor in Supabase Dashboard
2. Copy content from `supabase/migrations/001_create_contact_submissions.sql`
3. Paste and run the SQL query
4. This creates the `contact_submissions` table with proper RLS policies

### 3. Get Supabase Credentials
1. Go to Project Settings > API
2. Copy `Project URL` and `anon public` key
3. Save these for Vercel deployment

## Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Add Environment Variables
In Vercel project settings, add:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 4. Deploy
Click "Deploy" and wait for build to complete

## Post-Deployment

### Enable Google OAuth
1. In Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Add authorized redirect URLs from Vercel

### Test Contact Form
1. Visit your deployed site
2. Navigate to Contact section
3. Fill and submit form
4. Check Supabase > Table Editor > contact_submissions

## Viewing Contact Submissions

### Via Supabase Dashboard
1. Go to Table Editor
2. Select `contact_submissions` table
3. View all submissions with timestamps

### Via Admin Panel (Future Enhancement)
Contact submissions can be displayed in the admin panel by querying the table.

## Troubleshooting

### Form Not Submitting
- Check browser console for errors
- Verify Supabase credentials in Vercel
- Check RLS policies are enabled

### Database Connection Issues
- Verify environment variables are set
- Check Supabase project is active
- Ensure anon key has correct permissions
