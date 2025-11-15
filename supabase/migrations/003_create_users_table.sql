-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  profile_photo_url TEXT,
  status TEXT DEFAULT 'pending_email' CHECK (status IN ('pending_email', 'guest', 'candidate', 'member', 'suspended')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  invite_code_used TEXT,
  email_confirmed_at TIMESTAMPTZ,
  payment_amount DECIMAL(10,2),
  payment_date TIMESTAMPTZ,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'expired')),
  membership_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX idx_users_status ON users(status);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth_user_id = auth.uid() OR auth.uid() IS NULL);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth_user_id = auth.uid());

CREATE POLICY "Anyone can insert during registration" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all users" ON users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

