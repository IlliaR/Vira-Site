'use client';

import { useState } from 'react';
import type { BookingInquiry } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-red text-white',
  read: 'bg-black/10 text-black',
  handled: 'bg-black/5 text-black/40',
  archived: 'bg-black/5 text-black/30',
};

export default function InquiryList({ inquiries: initial }: { inquiries: BookingInquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function setStatus(id: string, status: string) {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setInquiries((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
    }
  }

  return (
    <div className="space-y-3">
      {inquiries.length === 0 && (
        <p className="text-sm text-black/40">No inquiries yet.</p>
      )}
      {inquiries.map((inq) => (
        <div key={inq.id} className="border border-black/10 overflow-hidden">
          <div
            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-black/2 transition-colors"
            onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
          >
            <div className="flex items-center gap-4">
              <span className={`text-xs uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[inq.status] ?? ''}`}>
                {inq.status}
              </span>
              <div>
                <p className="text-sm font-medium text-black">{inq.name}</p>
                <p className="text-xs text-black/40">{inq.email}</p>
              </div>
            </div>
            <p className="text-xs text-black/30 hidden sm:block">
              {new Date(inq.createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>

          {expanded === inq.id && (
            <div className="border-t border-black/10 px-5 py-5 bg-black/[0.02] space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {inq.phone && <p><span className="text-black/40">Phone: </span>{inq.phone}</p>}
                {inq.size && <p><span className="text-black/40">Size: </span>{inq.size}</p>}
                {inq.placement && <p><span className="text-black/40">Placement: </span>{inq.placement}</p>}
                {inq.preferredDates && <p><span className="text-black/40">Dates: </span>{inq.preferredDates}</p>}
              </div>
              <div>
                <p className="text-xs text-black/40 mb-1">Idea</p>
                <p className="text-sm text-black/80 whitespace-pre-wrap">{inq.idea}</p>
              </div>
              {inq.referenceImage && (
                <p className="text-xs">
                  <span className="text-black/40">Reference: </span>
                  <a href={inq.referenceImage} target="_blank" rel="noopener noreferrer" className="text-red underline">
                    View image
                  </a>
                </p>
              )}

              <div className="flex gap-2 pt-2">
                {['new', 'read', 'handled', 'archived'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(inq.id, s)}
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                      inq.status === s
                        ? 'bg-black text-white border-black'
                        : 'border-black/20 hover:border-black'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
