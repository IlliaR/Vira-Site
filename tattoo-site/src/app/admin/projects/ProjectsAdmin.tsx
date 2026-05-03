'use client';

import { useState } from 'react';
import type { ProjectCase, Category } from '@/types';

type ProjectWithCat = ProjectCase & { category: Category | null };

export default function ProjectsAdmin({
  projects: initial,
  categories,
}: {
  projects: ProjectWithCat[];
  categories: Category[];
}) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ProjectCase>>({});

  function startEdit(p: ProjectCase) {
    setEditing(p.id);
    setForm({
      titleEn: p.titleEn, titleDe: p.titleDe,
      descriptionEn: p.descriptionEn, descriptionDe: p.descriptionDe,
      heroImage: p.heroImage, linkTarget: p.linkTarget,
      categoryId: p.categoryId ?? undefined,
      order: p.order, visible: p.visible,
    });
  }

  async function save(id: string) {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setProjects((list) => list.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setEditing(null);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm('Delete this project case?')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) setProjects((list) => list.filter((p) => p.id !== id));
  }

  const f = (key: keyof ProjectCase, val: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border border-black/10 p-5">
          {editing === project.id ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input value={form.titleEn ?? ''} onChange={(e) => f('titleEn', e.target.value)} placeholder="Title EN" className="border border-black/20 px-3 py-2 text-sm" />
                <input value={form.titleDe ?? ''} onChange={(e) => f('titleDe', e.target.value)} placeholder="Title DE" className="border border-black/20 px-3 py-2 text-sm" />
                <textarea value={form.descriptionEn ?? ''} onChange={(e) => f('descriptionEn', e.target.value)} placeholder="Description EN" rows={3} className="border border-black/20 px-3 py-2 text-sm resize-none" />
                <textarea value={form.descriptionDe ?? ''} onChange={(e) => f('descriptionDe', e.target.value)} placeholder="Description DE" rows={3} className="border border-black/20 px-3 py-2 text-sm resize-none" />
              </div>
              <input value={form.heroImage ?? ''} onChange={(e) => f('heroImage', e.target.value)} placeholder="Hero image path e.g. /images/..." className="w-full border border-black/20 px-3 py-2 text-sm" />
              <input value={form.linkTarget ?? ''} onChange={(e) => f('linkTarget', e.target.value)} placeholder="Link target e.g. /gallery?category=blackwork" className="w-full border border-black/20 px-3 py-2 text-sm" />
              <div className="flex items-center gap-4">
                <select value={form.categoryId ?? ''} onChange={(e) => f('categoryId', e.target.value)} className="border border-black/20 px-3 py-2 text-sm bg-white">
                  <option value="">— No category —</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.nameEn}</option>)}
                </select>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.visible ?? true} onChange={(e) => f('visible', e.target.checked)} className="accent-red" />
                  Visible
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => save(project.id)} className="bg-black text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-red transition-colors">Save</button>
                <button onClick={() => setEditing(null)} className="border border-black/20 px-4 py-2 text-xs uppercase tracking-widest hover:border-black">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">{project.titleEn}</p>
                <p className="text-xs text-black/40">{project.linkTarget}</p>
                {!project.visible && <span className="text-xs text-red/60">Hidden</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(project)} className="text-xs border border-black/20 px-3 py-1.5 hover:border-black uppercase tracking-widest">Edit</button>
                <button onClick={() => deleteProject(project.id)} className="text-xs border border-red/30 text-red px-3 py-1.5 hover:bg-red hover:text-white transition-colors uppercase tracking-widest">Del</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
