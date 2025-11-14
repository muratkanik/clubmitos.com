import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { createSupabaseServiceRoleClient } from '../../../../lib/supabase';

const schema = z.object({
  code: z
    .string()
    .min(6)
    .max(64)
    .regex(/^[A-Za-z0-9-]+$/)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Kod formatı geçersiz.' }, { status: 400 });
  }

  const { code } = parsed.data;
  const normalizedCode = code.trim().toUpperCase();

  const serviceClient = createSupabaseServiceRoleClient();

  if (!serviceClient) {
    return NextResponse.json({ error: 'Sunucu yapılandırması eksik.' }, { status: 500 });
  }

  const { data: invite } = await serviceClient
    .from('invite_codes')
    .select('id, used_by')
    .eq('code', normalizedCode)
    .maybeSingle();

  if (!invite) {
    return NextResponse.json({ error: 'Kod bulunamadı.' }, { status: 404 });
  }

  if (invite.used_by) {
    return NextResponse.json({ error: 'Kod zaten kullanılmış.' }, { status: 409 });
  }

  cookies().set({
    name: 'invite_code',
    value: normalizedCode,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60
  });

  return NextResponse.json({ success: true });
}
