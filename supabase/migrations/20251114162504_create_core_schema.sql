-- ============================================
-- CORE SCHEMA - SIFIRDAN (qiaxjdumtbgizmbpjeek)
-- ============================================

-- 1. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users NOT NULL,
  profile_photo_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  participant_type_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. participant_types
CREATE TABLE IF NOT EXISTS public.participant_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. roles
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES public.profiles(id),
  UNIQUE(user_id, role_id)
);

-- 5. invite_codes
CREATE TABLE IF NOT EXISTS public.invite_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  used_by UUID REFERENCES public.profiles(id),
  used_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participant_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;

-- RLS: Kendi profili
CREATE POLICY "own_profile" ON public.profiles
FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- RLS: Admin full (DOĞRU: JWT üzerinden metadata)
CREATE POLICY "admin_full" ON public.profiles
FOR ALL USING ((auth.jwt() ->> 'is_admin')::boolean = true);

-- Diğer tablolar için admin (DOĞRU)
DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['participant_types','roles','user_roles','invite_codes'] LOOP
    EXECUTE format('
      CREATE POLICY "admin_full_%I" ON public.%I
      FOR ALL USING ((auth.jwt() ->> ''is_admin'')::boolean = true);
    ', tbl, tbl);
  END LOOP;
END $$;