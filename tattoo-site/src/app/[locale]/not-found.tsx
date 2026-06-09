import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h1 className="font-serif text-8xl italic mb-4 text-white">404</h1>
      <p className="text-gray-400 text-lg mb-8">
        Diese Seite existiert nicht.
      </p>
      <Link
        href="/de"
        className="border border-white text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
