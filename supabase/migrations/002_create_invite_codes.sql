-- Create invite_codes table
CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  used_by UUID,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0
);

-- Create index for faster lookups
CREATE INDEX idx_invite_codes_code ON invite_codes(code);
CREATE INDEX idx_invite_codes_used_by ON invite_codes(used_by);

-- Enable RLS
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can check invite codes" ON invite_codes
  FOR SELECT USING (true);

CREATE POLICY "Admins can create invite codes" ON invite_codes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update invite codes" ON invite_codes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete invite codes" ON invite_codes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.role = 'admin'
    )
  );

