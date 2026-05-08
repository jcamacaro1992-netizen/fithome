-- ════════════════════════════════════════════════════════════════════════════
-- FITHOME — SaaS Foundation Migration 001
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. TENANTS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tenants (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  slug        TEXT        UNIQUE NOT NULL,
  plan        TEXT        NOT NULL DEFAULT 'free'
              CHECK (plan IN ('free','starter','pro','enterprise')),
  -- config JSONB structure:
  -- {
  --   "brand":    { "color": "#4589FF", "name": "FitHome" },
  --   "features": { "nutrition": true, "ai": false },
  --   "limits":   { "users": 5 }
  -- }
  config      JSONB       NOT NULL DEFAULT '{}'::jsonb,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. PROFILES (extends auth.users) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id   UUID        NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  email       TEXT        NOT NULL,
  name        TEXT,
  role        TEXT        NOT NULL DEFAULT 'member'
              CHECK (role IN ('owner','admin','member')),
  avatar_url  TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. NUTRITION LOGS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.nutrition_logs (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID    NOT NULL REFERENCES public.tenants(id)  ON DELETE CASCADE,
  user_id         UUID    NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  logged_date     DATE    NOT NULL DEFAULT CURRENT_DATE,
  eaten_meal_ids  TEXT[]  NOT NULL DEFAULT '{}',
  water_glasses   INTEGER NOT NULL DEFAULT 0 CHECK (water_glasses BETWEEN 0 AND 20),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, logged_date)
);

-- ── 4. SHOPPING LIST (checked items) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.shopping_checked (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID        NOT NULL REFERENCES public.tenants(id)  ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, item_id)
);

-- ── 5. WORKOUT LOGS (rich set tracking for future) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id            UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID    NOT NULL REFERENCES public.tenants(id)  ON DELETE CASCADE,
  user_id       UUID    NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_idx       INTEGER NOT NULL CHECK (day_idx BETWEEN 0 AND 6),
  exercise_idx  INTEGER NOT NULL CHECK (exercise_idx >= 0),
  exercise_name TEXT    NOT NULL,
  logged_date   DATE    NOT NULL DEFAULT CURRENT_DATE,
  sets_data     JSONB   NOT NULL DEFAULT '[]'::jsonb,
  completed     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, day_idx, exercise_idx, logged_date)
);

-- ── 6. AUDIT LOGS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID        REFERENCES public.tenants(id),
  user_id     UUID        REFERENCES public.profiles(id),
  action      TEXT        NOT NULL,
  resource    TEXT,
  metadata    JSONB       NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 7. INDEXES ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_tenant        ON public.profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email         ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_nutrition_user_date    ON public.nutrition_logs(user_id, logged_date DESC);
CREATE INDEX IF NOT EXISTS idx_shopping_user          ON public.shopping_checked(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_user_date      ON public.workout_logs(user_id, logged_date DESC);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_created   ON public.audit_logs(tenant_id, created_at DESC);

-- ── 8. UPDATED_AT AUTO-TRIGGER ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.fn_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DO $$ BEGIN
  CREATE TRIGGER tg_tenants_updated_at
    BEFORE UPDATE ON public.tenants
    FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tg_nutrition_updated_at
    BEFORE UPDATE ON public.nutrition_logs
    FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tg_workout_updated_at
    BEFORE UPDATE ON public.workout_logs
    FOR EACH ROW EXECUTE FUNCTION public.fn_set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── 9. HELPER: get current user's tenant_id ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_my_tenant_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$;

-- ── 10. RPC: create profile for existing user (called from frontend) ──────────
CREATE OR REPLACE FUNCTION public.create_profile_for_existing_user(
  p_name TEXT DEFAULT NULL
)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id   UUID;
  v_email     TEXT;
  v_tenant_id UUID;
  v_slug      TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Already has a profile → return early
  IF EXISTS (SELECT 1 FROM public.profiles WHERE id = v_user_id) THEN
    RETURN jsonb_build_object('status', 'exists');
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;

  -- Build unique slug: prefix + 6 random hex chars
  v_slug := lower(regexp_replace(split_part(v_email, '@', 1), '[^a-z0-9]', '', 'g'))
            || '-'
            || substr(replace(gen_random_uuid()::text, '-', ''), 1, 6);

  -- Create tenant
  INSERT INTO public.tenants (name, slug, config)
  VALUES (
    COALESCE(p_name, split_part(v_email, '@', 1)),
    v_slug,
    jsonb_build_object(
      'brand',    jsonb_build_object('color', '#4589FF', 'name', 'FitHome'),
      'features', jsonb_build_object('nutrition', true, 'ai', false),
      'limits',   jsonb_build_object('users', 5)
    )
  )
  RETURNING id INTO v_tenant_id;

  -- Create profile as owner
  INSERT INTO public.profiles (id, tenant_id, email, name, role)
  VALUES (
    v_user_id, v_tenant_id, v_email,
    COALESCE(p_name, split_part(v_email, '@', 1)),
    'owner'
  );

  RETURN jsonb_build_object('status', 'created', 'tenant_id', v_tenant_id);
END;
$$;

-- ── 11. TRIGGER: auto-create profile + tenant on NEW signup ──────────────────
CREATE OR REPLACE FUNCTION public.fn_on_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_tenant_id UUID;
  v_slug      TEXT;
BEGIN
  v_slug := lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-z0-9]', '', 'g'))
            || '-'
            || substr(replace(gen_random_uuid()::text, '-', ''), 1, 6);

  INSERT INTO public.tenants (name, slug, config)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    v_slug,
    jsonb_build_object(
      'brand',    jsonb_build_object('color', '#4589FF', 'name', 'FitHome'),
      'features', jsonb_build_object('nutrition', true, 'ai', false),
      'limits',   jsonb_build_object('users', 5)
    )
  )
  RETURNING id INTO v_tenant_id;

  INSERT INTO public.profiles (id, tenant_id, email, name, role)
  VALUES (
    NEW.id, v_tenant_id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'owner'
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.fn_on_new_user();

-- ── 12. ENABLE ROW LEVEL SECURITY ────────────────────────────────────────────
ALTER TABLE public.tenants         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_logs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_checked ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs      ENABLE ROW LEVEL SECURITY;

-- Also add RLS to the existing progreso table
ALTER TABLE public.progreso        ENABLE ROW LEVEL SECURITY;

-- ── 13. RLS POLICIES ─────────────────────────────────────────────────────────

-- progreso (existing table) — own rows only
DROP POLICY IF EXISTS "progreso_own" ON public.progreso;
CREATE POLICY "progreso_own" ON public.progreso
  FOR ALL USING (user_id = auth.uid());

-- tenants — read own tenant
DROP POLICY IF EXISTS "tenants_read_own" ON public.tenants;
CREATE POLICY "tenants_read_own" ON public.tenants
  FOR SELECT USING (id = public.get_my_tenant_id());

-- tenants — owner/admin can update
DROP POLICY IF EXISTS "tenants_update_admin" ON public.tenants;
CREATE POLICY "tenants_update_admin" ON public.tenants
  FOR UPDATE USING (
    id = public.get_my_tenant_id()
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner','admin')
    )
  );

-- profiles — read anyone in same tenant
DROP POLICY IF EXISTS "profiles_read_tenant" ON public.profiles;
CREATE POLICY "profiles_read_tenant" ON public.profiles
  FOR SELECT USING (tenant_id = public.get_my_tenant_id());

-- profiles — user updates own row
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

-- profiles — admin can update any in tenant (for role management)
DROP POLICY IF EXISTS "profiles_admin_update" ON public.profiles;
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (
    tenant_id = public.get_my_tenant_id()
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('owner','admin')
    )
  );

-- nutrition_logs — own rows only
DROP POLICY IF EXISTS "nutrition_own" ON public.nutrition_logs;
CREATE POLICY "nutrition_own" ON public.nutrition_logs
  FOR ALL USING (user_id = auth.uid());

-- shopping_checked — own rows only
DROP POLICY IF EXISTS "shopping_own" ON public.shopping_checked;
CREATE POLICY "shopping_own" ON public.shopping_checked
  FOR ALL USING (user_id = auth.uid());

-- workout_logs — own rows only
DROP POLICY IF EXISTS "workout_own" ON public.workout_logs;
CREATE POLICY "workout_own" ON public.workout_logs
  FOR ALL USING (user_id = auth.uid());

-- workout_logs — admin sees all in tenant
DROP POLICY IF EXISTS "workout_admin_read" ON public.workout_logs;
CREATE POLICY "workout_admin_read" ON public.workout_logs
  FOR SELECT USING (
    tenant_id = public.get_my_tenant_id()
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner','admin')
    )
  );

-- audit_logs — admin reads, anyone inserts own
DROP POLICY IF EXISTS "audit_admin_read" ON public.audit_logs;
CREATE POLICY "audit_admin_read" ON public.audit_logs
  FOR SELECT USING (
    tenant_id = public.get_my_tenant_id()
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner','admin')
    )
  );
DROP POLICY IF EXISTS "audit_insert_own" ON public.audit_logs;
CREATE POLICY "audit_insert_own" ON public.audit_logs
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- ── 14. GRANT PERMISSIONS ─────────────────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.tenants, public.profiles, public.nutrition_logs,
     public.shopping_checked, public.workout_logs, public.audit_logs
  TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_tenant_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_profile_for_existing_user(TEXT) TO authenticated;

-- ════════════════════════════════════════════════════════════════════════════
-- DONE. Verify with:
--   SELECT * FROM public.tenants;
--   SELECT * FROM public.profiles;
-- ════════════════════════════════════════════════════════════════════════════
