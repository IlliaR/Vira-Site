'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GalleryImage, Category } from '@/types';

interface Props {
  images: (GalleryImage & { category: Category | null })[];
  categories: Category[];
}

export default function GalleryAdminList({ images: initial, categories }: Props) {
  const [images, setImages] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<GalleryImage>>({});

  function startEdit(img: GalleryImage) {
    setEditing(img.id);
    setForm({
      altTextEn: img.altTextEn,
      altTextDe: img.altTextDe,
      categoryId: img.categoryId ?? undefined,
      featured: img.featured,
      order: img.order,
    });
  }

  async function saveEdit(id: string) {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setImages((imgs) => imgs.map((i) => (i.id === id ? { ...i, ...updated } : i)));
      setEditing(null);
    }
  }

  async function deleteImage(id: string, filename: string) {
    if (!confirm(`Delete ${filename}?`)) return;
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) setImages((imgs) => imgs.filter((i) => i.id !== id));
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {images.map((img) => (
        <div key={img.id} className="border border-black/10 p-2">
          <div className="relative aspect-square mb-2 bg-black/5">
            <Image
              src={img.filename}
              alt={img.altTextEn || 'Gallery image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {editing === img.id ? (
            <div className="space-y-2 text-xs">
              <input
                value={form.altTextEn ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, altTextEn: e.target.value }))}
                placeholder="Alt EN"
                className="w-full border border-black/20 px-2 py-1 text-xs"
              />
              <input
                value={form.altTextDe ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, altTextDe: e.target.value }))}
                placeholder="Alt DE"
                className="w-full border border-black/20 px-2 py-1 text-xs"
              />
              <select
                value={form.categoryId ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value || undefined }))}
                className="w-full border border-black/20 px-2 py-1 text-xs bg-white"
              >
                <option value="">— No category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameEn}</option>
                ))}
              </select>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={form.featured ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="accent-red"
                />
                Featured
              </label>
              <input
                type="number"
                value={form.order ?? 0}
                onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) }))}
                className="w-full border border-black/20 px-2 py-1 text-xs"
                placeholder="Order"
              />
              <div className="flex gap-2">
                <button onClick={() => saveEdit(img.id)} className="flex-1 bg-black text-white py-1 text-xs hover:bg-red transition-colors">Save</button>
                <button onClick={() => setEditing(null)} className="flex-1 border border-black/20 py-1 text-xs hover:border-black">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-black/50 space-y-1">
              <p className="truncate">{img.altTextEn || '—'}</p>
              {img.featured && <span className="text-red">★ Featured</span>}
              <div className="flex gap-2 mt-2">
                <button onClick={() => startEdit(img)} className="flex-1 border border-black/20 py-1 text-xs hover:border-black">Edit</button>
                <button
                  onClick={() => deleteImage(img.id, img.filename)}
                  className="flex-1 border border-red/30 text-red py-1 text-xs hover:bg-red hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
