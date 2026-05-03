import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ImageUploader from '@/components/admin/ImageUploader';
import GalleryAdminList from './GalleryAdminList';

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const [images, categories] = await Promise.all([
    prisma.galleryImage.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Gallery</h1>

      <div className="mb-12">
        <h2 className="text-xs uppercase tracking-widest text-black/40 mb-4">Upload new image</h2>
        <ImageUploader categories={categories} />
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-widest text-black/40 mb-4">
          All images ({images.length})
        </h2>
        <GalleryAdminList images={images} categories={categories} />
      </div>
    </div>
  );
}
