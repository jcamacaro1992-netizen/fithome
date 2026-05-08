import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'

const AppCtx = createContext(null)

// ─── apply tenant brand colors to CSS variables ───────────────────────────────
function applyBranding(config) {
  const color = config?.brand?.color ?? '#4589FF'
  const root  = document.documentElement.style
  root.setProperty('--accent',      color)
  root.setProperty('--accent-dim',  `${color}18`)
  root.setProperty('--accent-glow', `${color}30`)
}

// ─── provider ────────────────────────────────────────────────────────────────
export function AppProvider({ children, user }) {
  const [profile, setProfile] = useState(null)
  const [tenant,  setTenant]  = useState(null)
  const [ready,   setReady]   = useState(false)
  const [error,   setError]   = useState(null)

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null)
      setTenant(null)
      setReady(true)
      return
    }

    setReady(false)
    setError(null)

    try {
      // Fetch profile joined with tenant in one query
      const { data, error: fetchErr } = await supabase
        .from('profiles')
        .select(`
          id, tenant_id, email, name, role, avatar_url, is_active, created_at,
          tenant:tenants (
            id, name, slug, plan, config, is_active, created_at
          )
        `)
        .eq('id', authUser.id)
        .maybeSingle()

      if (fetchErr) throw fetchErr

      if (data?.tenant) {
        setProfile(data)
        setTenant(data.tenant)
        applyBranding(data.tenant.config)
        setReady(true)
        return
      }

      // No profile yet (existing user before migration) → auto-create via RPC
      const { data: rpcResult, error: rpcErr } = await supabase
        .rpc('create_profile_for_existing_user')

      if (rpcErr) throw rpcErr

      if (rpcResult?.status === 'created' || rpcResult?.status === 'exists') {
        // Retry load after creation
        const { data: retry } = await supabase
          .from('profiles')
          .select(`
            id, tenant_id, email, name, role, avatar_url, is_active, created_at,
            tenant:tenants (
              id, name, slug, plan, config, is_active, created_at
            )
          `)
          .eq('id', authUser.id)
          .maybeSingle()

        if (retry?.tenant) {
          setProfile(retry)
          setTenant(retry.tenant)
          applyBranding(retry.tenant.config)
        }
      }
    } catch (e) {
      console.error('[AppContext]', e.message)
      setError(e.message)
    }

    setReady(true)
  }, [])

  useEffect(() => {
    loadProfile(user)
  }, [user?.id, loadProfile])

  // ── update tenant config (branding, features, limits) ─────────────────────
  async function updateTenantConfig(patch) {
    if (!tenant) return { error: 'No tenant' }
    const newConfig = deepMerge(tenant.config ?? {}, patch)

    const { error } = await supabase
      .from('tenants')
      .update({ config: newConfig })
      .eq('id', tenant.id)

    if (!error) {
      const updated = { ...tenant, config: newConfig }
      setTenant(updated)
      applyBranding(newConfig)

      // Audit log
      await supabase.from('audit_logs').insert({
        tenant_id: tenant.id,
        user_id:   profile?.id,
        action:    'tenant.config.updated',
        metadata:  { patch }
      })
    }
    return { error }
  }

  // ── update tenant name / plan ──────────────────────────────────────────────
  async function updateTenant(fields) {
    if (!tenant) return { error: 'No tenant' }
    const { error } = await supabase
      .from('tenants')
      .update(fields)
      .eq('id', tenant.id)

    if (!error) setTenant(prev => ({ ...prev, ...fields }))
    return { error }
  }

  // ── update own profile ─────────────────────────────────────────────────────
  async function updateProfile(fields) {
    if (!profile) return { error: 'No profile' }
    const { data, error } = await supabase
      .from('profiles')
      .update(fields)
      .eq('id', profile.id)
      .select()
      .maybeSingle()

    if (!error && data) setProfile(prev => ({ ...prev, ...data }))
    return { error }
  }

  // ── change user role (admin only) ─────────────────────────────────────────
  async function setUserRole(userId, role) {
    if (!isAdmin) return { error: 'Forbidden' }
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .eq('tenant_id', tenant.id)

    // Audit
    await supabase.from('audit_logs').insert({
      tenant_id: tenant.id,
      user_id:   profile?.id,
      action:    'user.role.changed',
      metadata:  { target_user: userId, new_role: role }
    })

    return { error }
  }

  const isOwner = profile?.role === 'owner'
  const isAdmin = profile?.role === 'owner' || profile?.role === 'admin'

  const planLabel = { free: 'Gratis', starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' }
  const planColor = { free: 'var(--muted)', starter: '#4589FF', pro: '#F59E0B', enterprise: '#A78BFA' }

  return (
    <AppCtx.Provider value={{
      profile, tenant, ready, error,
      isOwner, isAdmin,
      planLabel: planLabel[tenant?.plan] ?? 'Gratis',
      planColor: planColor[tenant?.plan] ?? 'var(--muted)',
      updateTenantConfig,
      updateTenant,
      updateProfile,
      setUserRole,
      reload: () => loadProfile(user)
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppCtx)
  // Graceful fallback when used outside provider
  return ctx ?? {
    profile: null, tenant: null, ready: true, error: null,
    isOwner: false, isAdmin: false,
    planLabel: 'Gratis', planColor: 'var(--muted)',
    updateTenantConfig: async () => {},
    updateTenant: async () => {},
    updateProfile: async () => {},
    setUserRole: async () => {},
    reload: () => {}
  }
}

// ─── util: deep merge objects ─────────────────────────────────────────────────
function deepMerge(target, source) {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      target[key] !== null
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}
