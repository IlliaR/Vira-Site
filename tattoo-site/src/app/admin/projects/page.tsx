import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectsAdmin from './ProjectsAdmin';

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const [projects, categories] = await Promise.all([
    prisma.projectCase.findMany({
      orderBy: { order: 'asc' },
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Project Cases</h1>
      <ProjectsAdmin projects={projects} categories={categories} />
    </div>
  );
}
