import type { Session } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createSupabaseServerClient, createSupabaseServiceRoleClient } from './supabase';

export async function getSessionOrRedirect() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return { supabase, session: session as Session };
}

export async function requireProfile() {
  const { supabase, session } = await getSessionOrRedirect();

  async function forceLogout(target: string) {
    await supabase.auth.signOut();
    redirect(target);
  }

  let { data: profile } = await supabase
    .from('profiles')
    .select('id, profile_photo_url, is_admin, created_at')
    .eq('id', session.user.id)
    .maybeSingle();

  if (!profile) {
    const inviteCode = cookies().get('invite_code')?.value?.trim().toUpperCase();
    const serviceClient = createSupabaseServiceRoleClient();

    if (!inviteCode || !serviceClient) {
      await forceLogout('/login?error=onboarding');
    }

    const { data: invite } = await serviceClient
      .from('invite_codes')
      .select('id, used_by')
      .eq('code', inviteCode)
      .maybeSingle();

    if (!invite || invite.used_by) {
      await forceLogout('/login?error=invite');
    }

    const { error: insertError } = await supabase.from('profiles').insert({
      id: session.user.id,
      profile_photo_url: session.user.user_metadata?.avatar_url ?? null
    });

    if (insertError && insertError.code !== '23505') {
      await forceLogout('/login?error=profile');
    }

    await serviceClient
      .from('invite_codes')
      .update({ used_by: session.user.id, used_at: new Date().toISOString() })
      .eq('id', invite.id);

    const { data: refreshedProfile } = await supabase
      .from('profiles')
      .select('id, profile_photo_url, is_admin, created_at')
      .eq('id', session.user.id)
      .maybeSingle();

    profile = refreshedProfile ?? null;

    if (!profile) {
      await forceLogout('/login?error=profile');
    }
  }

  return { supabase, session, profile };
}
