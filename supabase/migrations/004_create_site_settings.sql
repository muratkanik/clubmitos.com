-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value_tr TEXT,
  value_en TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value_tr, value_en, description) VALUES
  ('membership_fee', '1000', '1000', 'Annual membership fee in TRY'),
  ('footer_address', 'Örnek Mahallesi, Deneme Caddesi No: 123, İstanbul', 'Sample Street, Test Avenue No: 123, Istanbul', 'Footer address'),
  ('footer_email', 'info@clubmitos.com', 'info@clubmitos.com', 'Contact email'),
  ('footer_phone', '+90 555 123 45 67', '+90 555 123 45 67', 'Contact phone')
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update settings" ON site_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE auth_user_id = auth.uid() AND role = 'admin')
  );
