import MotionWrapper from '@/components/ui/MotionWrapper';
import SvgAccent from '@/components/ui/SvgAccent';

interface PullQuoteProps {
  quote: string;
  author?: string;
}

export default function PullQuote({ quote, author }: PullQuoteProps) {
  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Ink drip accent top-right */}
          <div className="absolute -top-8 -right-4 md:-right-16 pointer-events-none opacity-40">
            <SvgAccent type="ink-drip" width={70} height={120} />
          </div>

          <MotionWrapper direction="none">
            <blockquote>
              <p className="font-display italic text-3xl md:text-5xl xl:text-6xl text-black leading-tight mb-6 text-balance">
                {quote}
              </p>
              {author && (
                <cite className="font-sans text-xs uppercase tracking-[0.25em] text-black/40 not-italic">
                  {author}
                </cite>
              )}
            </blockquote>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
