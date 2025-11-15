# Admin Setup Guide

## How to Create Your First Admin User

The admin panel is stuck on "Loading..." because you need to set up your first admin user. Follow these steps:

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run this query (replace with your actual email):

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Option 2: Using the Function

1. The migration `005_create_admin_user.sql` creates a helper function
2. In Supabase SQL Editor, run:

```sql
SELECT make_user_admin('your-email@example.com');
```

### Verify Admin Access

1. Log out and log back in
2. Navigate to `/admin`
3. You should now see the admin dashboard

## Troubleshooting

### Still seeing "Loading..."?

Check the browser console for errors. Common issues:

1. **User not in database**: Make sure you've registered and confirmed your email
2. **Wrong email**: Verify the email matches your auth.users email
3. **RLS policies**: Ensure the admin policies are applied (check migrations)

### Check if user exists:

```sql
SELECT * FROM users WHERE email = 'your-email@example.com';
```

### Check auth user:

```sql
SELECT * FROM auth.users WHERE email = 'your-email@example.com';
```

### Manual fix:

If the user exists but role is not admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Admin Features

Once logged in as admin, you can:

- View all registered users
- Filter users by status (pending_email, guest, candidate, member)
- Approve candidates to member status
- Manage invite codes (create, view usage, deactivate)
- Track payment information
- View statistics (total members, pending approvals, active codes)
