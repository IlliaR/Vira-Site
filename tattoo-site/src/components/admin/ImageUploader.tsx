'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface UploadedImage {
  id: string;
  filename: string;
  altTextEn: string;
  altTextDe: string;
}

interface ImageUploaderProps {
  categories: Array<{ id: string; nameEn: string }>;
  onUploaded?: (image: UploadedImage) => void;
}

export default function ImageUploader({ categories, onUploaded }: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [altTextEn, setAltTextEn] = useState('');
  const [altTextDe, setAltTextDe] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  async function handleUpload() {
    if (!files[0]) return;
    setUploading(true);
    setResult(null);

    const fd = new FormData();
    fd.append('file', files[0]);
    fd.append('altTextEn', altTextEn);
    fd.append('altTextDe', altTextDe);
    if (categoryId) fd.append('categoryId', categoryId);
    fd.append('featured', String(featured));

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();

      if (res.ok) {
        setResult('✓ Uploaded successfully');
        setFiles([]);
        setAltTextEn('');
        setAltTextDe('');
        onUploaded?.(data);
      } else {
        setResult(`✗ ${data.error ?? 'Upload failed'}`);
      }
    } catch {
      setResult('✗ Network error');
    } finally {
      setUploading(false);
    }
  }

  const preview = files[0] ? URL.createObjectURL(files[0]) : null;

  return (
    <div className="space-y-5">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-red bg-red/5' : 'border-black/20 hover:border-black'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-40 h-40 mx-auto">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        ) : (
          <div>
            <p className="text-2xl mb-2">⬆</p>
            <p className="text-sm text-black/50">
              {isDragActive ? 'Drop here' : 'Drag & drop an image, or click to browse'}
            </p>
            <p className="text-xs text-black/30 mt-1">JPG, PNG, WebP · max 10 MB</p>
          </div>
        )}
      </div>

      {files[0] && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-black/50 block mb-1">Alt text (EN)</label>
              <input
                value={altTextEn}
                onChange={(e) => setAltTextEn(e.target.value)}
                placeholder="Describe the image in English"
                className="w-full border border-black/20 text-sm px-3 py-2 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-black/50 block mb-1">Alt text (DE)</label>
              <input
                value={altTextDe}
                onChange={(e) => setAltTextDe(e.target.value)}
                placeholder="Beschreibung auf Deutsch"
                className="w-full border border-black/20 text-sm px-3 py-2 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-black/50 block mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border border-black/20 text-sm px-3 py-2 focus:outline-none focus:border-black bg-white"
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameEn}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="accent-red"
              />
              Featured
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-black text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-red transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : 'Upload image'}
          </button>
        </div>
      )}

      {result && (
        <p className={`text-sm ${result.startsWith('✓') ? 'text-black/60' : 'text-red'}`}>{result}</p>
      )}
    </div>
  );
}
