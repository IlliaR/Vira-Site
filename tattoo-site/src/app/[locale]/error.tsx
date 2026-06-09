'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <h2 className="font-serif text-4xl italic mb-4">Etwas ist schiefgelaufen</h2>
      <p className="text-gray-400 mb-8">Bitte versuche es erneut.</p>
      <button
        onClick={reset}
        className="border border-white text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
