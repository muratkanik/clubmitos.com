import { redirect } from 'next/navigation';
import { requireProfile } from '../../lib/profile';
import { UploadPhoto } from '../../components/UploadPhoto';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { createSupabaseServerClient } from '../../lib/supabase';

async function signOutAction() {
  'use server';
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export default async function ProfilePage() {
  const { supabase, session, profile } = await requireProfile();

  const { data: roles } = await supabase
    .from('user_roles')
    .select('roles(name)')
    .eq('user_id', session.user.id);

  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-xs uppercase text-slate-500">Üyelik ID</p>
              <p className="font-mono text-sm text-slate-900">{session.user.id}</p>
            </div>
            <UploadPhoto userId={session.user.id} initialUrl={profile.profile_photo_url} />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Google: {session.user.email}</Badge>
              <Badge variant={profile.is_admin ? 'default' : 'outline'}>{profile.is_admin ? 'Admin' : 'Üye'}</Badge>
            </div>
            <form action={signOutAction}>
              <Button type="submit" variant="outline">
                Çıkış yap
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Roller & yetkiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            {roles && roles.length > 0 ? (
              <ul className="list-disc space-y-1 pl-5">
                {roles.map((role) => (
                  <li key={role.roles?.name}>{role.roles?.name}</li>
                ))}
              </ul>
            ) : (
              <p>Herhangi bir rol atanmadı.</p>
            )}
            <p className="text-xs text-slate-400">Roller Supabase üzerindeki `roles` tablosundan yönetilir.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
