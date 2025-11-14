"use client";

import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export function UploadPhoto() {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from("profile-photos")
      .upload(fileName, file, { upsert: true });

    if (!error) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-photos").getPublicUrl(fileName);

      await supabase
        .from("profiles")
        .upsert({ id: user.id, profile_photo_url: publicUrl });
    }

    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      {uploading && <p className="mt-2 text-sm text-blue-600">Yükleniyor...</p>}
    </div>
  );
}
