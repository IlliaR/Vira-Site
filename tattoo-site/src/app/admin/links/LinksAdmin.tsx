'use client';

import { useState } from 'react';
import type { Link } from '@/types';

export default function LinksAdmin({ links: initial }: { links: Link[] }) {
  const [links, setLinks] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Link>>({});
  const [newForm, setNewForm] = useState({ label: '', url: '', type: 'social', icon: '' });
  const [adding, setAdding] = useState(false);

  function f(key: keyof Link, val: string | boolean | number) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  async function save(id: string) {
    const res = await fetch('/api/links', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });
    if (res.ok) {
      const updated = await res.json();
      setLinks((l) => l.map((lnk) => (lnk.id === id ? updated : lnk)));
      setEditing(null);
    }
  }

  async function deleteLink(id: string) {
    if (!confirm('Delete this link?')) return;
    await fetch('/api/links', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setLinks((l) => l.filter((lnk) => lnk.id !== id));
  }

  async function addLink() {
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    if (res.ok) {
      const created = await res.json();
      setLinks((l) => [...l, created]);
      setNewForm({ label: '', url: '', type: 'social', icon: '' });
      setAdding(false);
    }
  }

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <div key={link.id} className="border border-black/10 p-4 flex items-center justify-between">
          {editing === link.id ? (
            <div className="flex-1 grid grid-cols-2 gap-3 mr-4">
              <input value={form.label ?? ''} onChange={(e) => f('label', e.target.value)} placeholder="Label" className="border border-black/20 px-3 py-2 text-sm" />
              <input value={form.url ?? ''} onChange={(e) => f('url', e.target.value)} placeholder="URL" className="border border-black/20 px-3 py-2 text-sm" />
              <select value={form.type ?? 'social'} onChange={(e) => f('type', e.target.value)} className="border border-black/20 px-3 py-2 text-sm bg-white">
                <option value="social">Social</option>
                <option value="booking">Booking</option>
                <option value="external">External</option>
              </select>
              <input value={form.icon ?? ''} onChange={(e) => f('icon', e.target.value)} placeholder="Icon name" className="border border-black/20 px-3 py-2 text-sm" />
            </div>
          ) : (
            <div className="flex-1">
              <p className="text-sm font-medium text-black">{link.label}</p>
              <p className="text-xs text-black/40 truncate">{link.url}</p>
            </div>
          )}
          <div className="flex gap-2">
            {editing === link.id ? (
              <>
                <button onClick={() => save(link.id)} className="text-xs bg-black text-white px-3 py-1.5 hover:bg-red transition-colors">Save</button>
                <button onClick={() => setEditing(null)} className="text-xs border border-black/20 px-3 py-1.5">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => { setEditing(link.id); setForm(link); }} className="text-xs border border-black/20 px-3 py-1.5 hover:border-black uppercase tracking-widest">Edit</button>
                <button onClick={() => deleteLink(link.id)} className="text-xs text-red/60 hover:text-red uppercase tracking-widest">Del</button>
              </>
            )}
          </div>
        </div>
      ))}

      {adding ? (
        <div className="border border-black/10 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={newForm.label} onChange={(e) => setNewForm((f) => ({ ...f, label: e.target.value }))} placeholder="Label" className="border border-black/20 px-3 py-2 text-sm" />
            <input value={newForm.url} onChange={(e) => setNewForm((f) => ({ ...f, url: e.target.value }))} placeholder="URL" className="border border-black/20 px-3 py-2 text-sm" />
            <select value={newForm.type} onChange={(e) => setNewForm((f) => ({ ...f, type: e.target.value }))} className="border border-black/20 px-3 py-2 text-sm bg-white">
              <option value="social">Social</option>
              <option value="booking">Booking</option>
              <option value="external">External</option>
            </select>
            <input value={newForm.icon} onChange={(e) => setNewForm((f) => ({ ...f, icon: e.target.value }))} placeholder="Icon" className="border border-black/20 px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button onClick={addLink} className="text-xs bg-black text-white px-4 py-2 hover:bg-red transition-colors uppercase tracking-widest">Add</button>
            <button onClick={() => setAdding(false)} className="text-xs border border-black/20 px-4 py-2">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="text-xs border border-dashed border-black/20 px-4 py-3 w-full hover:border-black transition-colors uppercase tracking-widest text-black/40 hover:text-black">
          + Add link
        </button>
      )}
    </div>
  );
}
