import { redirect } from 'next/navigation';

// Root-level 404: redirect to the default locale
export default function RootNotFound() {
  redirect('/de');
}
