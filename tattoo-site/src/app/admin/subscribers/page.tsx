import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SubscriberList from './SubscriberList';

export default async function AdminSubscribersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display italic text-4xl text-black">Subscribers</h1>
        <a
          href="/api/subscribers?format=csv"
          className="text-xs uppercase tracking-widest border border-black/20 px-4 py-2 hover:border-black transition-colors"
        >
          Export CSV
        </a>
      </div>
      <SubscriberList subscribers={subscribers} />
    </div>
  );
}
