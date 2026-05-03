import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const [imageCount, projectCount, subscriberCount, inquiryCount] = await Promise.all([
    prisma.galleryImage.count(),
    prisma.projectCase.count(),
    prisma.newsletterSubscriber.count({ where: { status: 'confirmed' } }),
    prisma.bookingInquiry.count({ where: { status: 'new' } }),
  ]);

  const stats = [
    { label: 'Gallery images', value: imageCount, href: '/admin/gallery' },
    { label: 'Project cases', value: projectCount, href: '/admin/projects' },
    { label: 'Subscribers', value: subscriberCount, href: '/admin/subscribers' },
    { label: 'New inquiries', value: inquiryCount, href: '/admin/inquiries', highlight: inquiryCount > 0 },
  ];

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`border p-5 hover:border-black transition-colors ${
              s.highlight ? 'border-red bg-red/5' : 'border-black/15'
            }`}
          >
            <p className={`text-3xl font-display italic mb-1 ${s.highlight ? 'text-red' : 'text-black'}`}>
              {s.value}
            </p>
            <p className="text-xs uppercase tracking-widest text-black/50">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Upload images', href: '/admin/gallery', desc: 'Add or manage gallery images' },
          { label: 'Edit content', href: '/admin/content', desc: 'Update page copy in EN/DE' },
          { label: 'Manage links', href: '/admin/links', desc: 'Social and booking links' },
          { label: 'View inquiries', href: '/admin/inquiries', desc: 'Booking form submissions' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-black/15 p-5 hover:border-black transition-colors group"
          >
            <p className="text-sm font-medium text-black group-hover:text-red transition-colors mb-1">{item.label}</p>
            <p className="text-xs text-black/40">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
