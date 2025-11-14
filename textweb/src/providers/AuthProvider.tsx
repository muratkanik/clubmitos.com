'use client';

import { SessionContextProvider, useSessionContext } from '@supabase/auth-helpers-react';
import { ReactNode, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '../lib/supabase';

type Props = {
  children: ReactNode;
};

function ProfileEnsurer() {
  const { session } = useSessionContext();

  useEffect(() => {
    if (!session) {
      return;
    }

    const controller = new AbortController();

    fetch('/api/auth/ensure-profile', {
      method: 'POST',
      credentials: 'same-origin',
      signal: controller.signal
    }).catch((error) => console.error('Profil eşitleme başarısız', error));

    return () => controller.abort();
  }, [session]);

  return null;
}

export function AuthProvider({ children }: Props) {
  const [supabaseClient] = useState(() => createSupabaseBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <ProfileEnsurer />
      {children}
    </SessionContextProvider>
  );
}
