"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadPhoto } from "@/components/UploadPhoto";

export default function Home() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  if (loading) return <p className="text-center p-6">Yükleniyor...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Club Mitos</h1>

      {user ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-4">
            {profile?.profile_photo_url ? (
              <img
                src={profile.profile_photo_url}
                alt="Profil"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-20 h-20" />
            )}
            <div>
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm text-gray-600">
                {profile?.is_admin ? "Admin" : "Üye"}
              </p>
            </div>
          </div>
          <UploadPhoto />
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Google ile Giriş Yap
          </button>
        </div>
      )}
    </main>
  );
}
