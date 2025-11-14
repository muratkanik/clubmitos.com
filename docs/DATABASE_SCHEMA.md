# CLUB MITOS - VERİTABANI ŞEMASI (SIFIRDAN)

## 1. profiles
`sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users NOT NULL,
  profile_photo_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  participant_type_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

