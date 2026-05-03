'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  allLabel: string;
  locale: string;
}

export default function CategoryFilter({ categories, allLabel, locale }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? '';

  function setCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const all = [{ slug: '', nameEn: allLabel, nameDe: allLabel, id: '__all__' }, ...categories];

  return (
    <div className="flex flex-wrap gap-2 mb-10 md:mb-14" role="group" aria-label="Filter by category">
      {all.map((cat) => {
        const isActive = active === cat.slug;
        const label = locale === 'de' ? cat.nameDe : cat.nameEn;
        return (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            aria-pressed={isActive}
            className={`text-xs font-sans uppercase tracking-widest px-4 py-2 border transition-colors ${
              isActive
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/60 border-black/20 hover:border-black hover:text-black'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
