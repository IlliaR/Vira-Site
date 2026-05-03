'use client';

import { useState } from 'react';
import type { TextBlock } from '@/types';

export default function ContentEditor({ blocks: initial }: { blocks: TextBlock[] }) {
  const [blocks, setBlocks] = useState(initial);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const pages = [...new Set(blocks.map((b) => b.page))];

  async function save(block: TextBlock) {
    setSaving(block.id);
    const res = await fetch('/api/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: block.id, valueEn: block.valueEn, valueDe: block.valueDe }),
    });
    setSaving(null);
    if (res.ok) {
      setSaved(block.id);
      setTimeout(() => setSaved(null), 2000);
    }
  }

  function update(id: string, field: 'valueEn' | 'valueDe', val: string) {
    setBlocks((list) => list.map((b) => (b.id === id ? { ...b, [field]: val } : b)));
  }

  return (
    <div className="space-y-10">
      {pages.map((page) => (
        <div key={page}>
          <h2 className="text-xs uppercase tracking-widest text-black/40 mb-4 border-b border-black/10 pb-2">
            {page}
          </h2>
          <div className="space-y-6">
            {blocks.filter((b) => b.page === page).map((block) => {
              const isLong = block.valueEn.length > 80;
              return (
                <div key={block.id} className="space-y-2">
                  <p className="text-xs font-mono text-black/40">{block.key}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(['valueEn', 'valueDe'] as const).map((field) => (
                      <div key={field}>
                        <label className="text-xs uppercase tracking-widest text-black/30 block mb-1">
                          {field === 'valueEn' ? 'English' : 'Deutsch'}
                        </label>
                        {isLong ? (
                          <textarea
                            value={block[field]}
                            onChange={(e) => update(block.id, field, e.target.value)}
                            rows={4}
                            className="w-full border border-black/20 text-sm px-3 py-2 focus:outline-none focus:border-black resize-none"
                          />
                        ) : (
                          <input
                            value={block[field]}
                            onChange={(e) => update(block.id, field, e.target.value)}
                            className="w-full border border-black/20 text-sm px-3 py-2 focus:outline-none focus:border-black"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => save(block)}
                    disabled={saving === block.id}
                    className="text-xs uppercase tracking-widest border border-black/20 px-4 py-1.5 hover:border-black transition-colors disabled:opacity-50"
                  >
                    {saving === block.id ? 'Saving…' : saved === block.id ? '✓ Saved' : 'Save'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
