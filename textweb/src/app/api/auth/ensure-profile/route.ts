import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseServerClient, createSupabaseServiceRoleClient } from '../../../../lib/supabase';

export async function POST() {
  const supabase = createSupabaseServerClient();
  const serviceClient = createSupabaseServiceRoleClient();

  if (!serviceClient) {
    return NextResponse.json({ error: 'Sunucu servis anahtarı yok' }, { status: 500 });
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });
  }

  const { data: profile } = await supabase.from('profiles').select('id').eq('id', session.user.id).maybeSingle();

  if (profile) {
    return NextResponse.json({ ok: true });
  }

  const inviteCode = cookies().get('invite_code')?.value?.trim().toUpperCase();

  if (!inviteCode) {
    return NextResponse.json({ error: 'Davet kodu bulunamadı' }, { status: 403 });
  }

  const { data: invite } = await serviceClient
    .from('invite_codes')
    .select('id, used_by')
    .eq('code', inviteCode)
    .maybeSingle();

  if (!invite || invite.used_by) {
    return NextResponse.json({ error: 'Kod kullanılamıyor' }, { status: 409 });
  }

  const { error: profileInsertError } = await supabase.from('profiles').insert({
    id: session.user.id,
    profile_photo_url: session.user.user_metadata?.avatar_url ?? null,
    is_admin: false
  });

  if (profileInsertError && profileInsertError.code !== '23505') {
    return NextResponse.json({ error: 'Profil oluşturulamadı' }, { status: 500 });
  }

  await serviceClient
    .from('invite_codes')
    .update({ used_by: session.user.id, used_at: new Date().toISOString() })
    .eq('id', invite.id);

  cookies().delete('invite_code');

  return NextResponse.json({ ok: true });
}
