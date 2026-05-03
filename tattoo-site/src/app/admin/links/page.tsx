import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import LinksAdmin from './LinksAdmin';

export default async function AdminLinksPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const links = await prisma.link.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Links</h1>
      <LinksAdmin links={links} />
    </div>
  );
}
