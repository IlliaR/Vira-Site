import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import '../globals.css';

export const metadata = { title: 'Admin — Vira Linevych', robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Allow login page without auth
  // (Next.js will render login/page.tsx but layout still runs)
  // We redirect only if not on the login path
  // The simplest approach: check in middleware or here

  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        {session ? (
          <div className="flex min-h-screen">
            <AdminNav />
            <main className="flex-1 ml-0 md:ml-56 p-6 md:p-10">{children}</main>
          </div>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
