import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireProfile } from '../../lib/profile';
import { createSupabaseServerClient } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { customAlphabet } from 'nanoid';

const inviteId = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 12);

async function toggleAdminAction(formData: FormData) {
  'use server';
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: selfProfile } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).maybeSingle();

  if (!selfProfile?.is_admin) {
    throw new Error('Yalnızca adminler rol değiştirebilir.');
  }

  const userId = formData.get('userId')?.toString();
  const makeAdmin = formData.get('makeAdmin') === 'true';

  if (!userId) {
    throw new Error('Kullanıcı bulunamadı.');
  }

  await supabase.from('profiles').update({ is_admin: makeAdmin }).eq('id', userId);
  revalidatePath('/admin');
}

async function createInviteCodeAction(formData: FormData) {
  'use server';
  const supabase = createSupabaseServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: selfProfile } = await supabase.from('profiles').select('is_admin').eq('id', session.user.id).maybeSingle();

  if (!selfProfile?.is_admin) {
    throw new Error('Yalnızca adminler davet oluşturabilir.');
  }

  const customCode = formData.get('customCode')?.toString().trim().toUpperCase();
  const finalCode = customCode && customCode.length >= 6 ? customCode : `MITOS-${inviteId()}`;

  await supabase.from('invite_codes').insert({ code: finalCode, created_by: session.user.id });
  revalidatePath('/admin');
}

export default async function AdminPage() {
  const { supabase, profile } = await requireProfile();

  if (!profile.is_admin) {
    redirect('/profile');
  }

  const { data: members = [] } = await supabase
    .from('profiles')
    .select('id, profile_photo_url, is_admin, created_at')
    .order('created_at', { ascending: false });

  const { data: invites = [] } = await supabase
    .from('invite_codes')
    .select('id, code, used_by, used_at, created_at')
    .order('created_at', { ascending: false })
    .limit(25);

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Paneli</h1>
        <p className="text-sm text-slate-500">
          Kullanıcıları görüntüle, admin durumunu değiştir ve davet kodları oluştur. Tüm işlemler Supabase RLS ile korunur.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Oluşturulma</TableHead>
                <TableHead className="text-right">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-mono text-xs">{member.id}</TableCell>
                  <TableCell>
                    <Badge variant={member.is_admin ? 'default' : 'secondary'}>{member.is_admin ? 'Admin' : 'Üye'}</Badge>
                  </TableCell>
                  <TableCell>{new Date(member.created_at).toLocaleString('tr-TR')}</TableCell>
                  <TableCell className="text-right">
                    <form action={toggleAdminAction} className="inline-flex">
                      <input type="hidden" name="userId" value={member.id} />
                      <input type="hidden" name="makeAdmin" value={(!member.is_admin).toString()} />
                      <Button type="submit" variant="outline" size="sm">
                        {member.is_admin ? 'Adminliği kaldır' : 'Admin yap'}
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Davet Kodları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={createInviteCodeAction} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              name="customCode"
              placeholder="Opsiyonel özel kod"
              className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
              maxLength={32}
            />
            <Button type="submit">Yeni davet oluştur</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Kullanım</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-mono text-xs">{invite.code}</TableCell>
                  <TableCell>
                    <Badge variant={invite.used_by ? 'secondary' : 'default'}>{invite.used_by ? 'Kullanıldı' : 'Boşta'}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {invite.used_by ? (
                      <span className="font-mono">
                        {invite.used_by} — {invite.used_at ? new Date(invite.used_at).toLocaleString('tr-TR') : ''}
                      </span>
                    ) : (
                      'Bekliyor'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
