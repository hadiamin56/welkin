"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Upload } from "lucide-react";

export function ImageUploadField({
  name,
  defaultValue = "",
  folder,
}: {
  name: string;
  defaultValue?: string;
  folder: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const supabase = createClient();
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      upsert: false,
    });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        {url ? (
          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
            <Image src={url} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100 text-slate-300 ring-1 ring-slate-200">
            <Upload className="h-5 w-5" />
          </div>
        )}
        <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
          {uploading ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...
            </span>
          ) : (
            "Choose image"
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
        <input
          type="text"
          placeholder="or paste an image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input flex-1 text-xs"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
