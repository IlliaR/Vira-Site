import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ContentEditor from './ContentEditor';

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const blocks = await prisma.textBlock.findMany({
    orderBy: [{ page: 'asc' }, { key: 'asc' }],
  });

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Page Content</h1>
      <ContentEditor blocks={blocks} />
    </div>
  );
}
