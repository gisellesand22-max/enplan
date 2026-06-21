import type { SupabaseClient } from '@supabase/supabase-js'

export async function signInWithGoogle(
  supabase: SupabaseClient,
  redirectTo?: string
) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo ?? (typeof window !== 'undefined' ? window.location.origin : undefined),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) throw error
  return data
}
