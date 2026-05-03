'use client';

import { useState } from 'react';
import type { NewsletterSubscriber } from '@/types';

export default function SubscriberList({ subscribers: initial }: { subscribers: NewsletterSubscriber[] }) {
  const [subscribers, setSubscribers] = useState(initial);

  async function deleteSubscriber(id: string, email: string) {
    if (!confirm(`GDPR delete ${email}? This cannot be undone.`)) return;
    const res = await fetch(`/api/subscribers/${id}`, { method: 'DELETE' });
    if (res.ok) setSubscribers((list) => list.filter((s) => s.id !== id));
  }

  const confirmed = subscribers.filter((s) => s.status === 'confirmed').length;

  return (
    <div>
      <p className="text-xs text-black/40 mb-6">{confirmed} confirmed · {subscribers.length} total</p>

      <div className="border border-black/10 divide-y divide-black/10">
        <div className="grid grid-cols-4 px-4 py-2 bg-black/[0.03] text-xs uppercase tracking-widest text-black/40">
          <span>Email</span>
          <span>Status</span>
          <span>Subscribed</span>
          <span></span>
        </div>

        {subscribers.map((sub) => (
          <div key={sub.id} className="grid grid-cols-4 items-center px-4 py-3 text-sm">
            <span className="text-black truncate">{sub.email}</span>
            <span className={`text-xs uppercase tracking-widest ${
              sub.status === 'confirmed' ? 'text-black' : 'text-black/30'
            }`}>
              {sub.status}
            </span>
            <span className="text-xs text-black/40">
              {sub.consentAt
                ? new Date(sub.consentAt).toLocaleDateString('en-GB')
                : new Date(sub.createdAt).toLocaleDateString('en-GB')}
            </span>
            <button
              onClick={() => deleteSubscriber(sub.id, sub.email)}
              className="text-xs text-red/60 hover:text-red transition-colors text-right uppercase tracking-widest"
            >
              Delete (GDPR)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
