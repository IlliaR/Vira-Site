import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import InquiryList from './InquiryList';

export default async function AdminInquiriesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const inquiries = await prisma.bookingInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="font-display italic text-4xl text-black mb-8">Booking Inquiries</h1>
      <InquiryList inquiries={inquiries} />
    </div>
  );
}
