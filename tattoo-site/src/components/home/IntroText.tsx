import MotionWrapper from '@/components/ui/MotionWrapper';
import SvgAccent from '@/components/ui/SvgAccent';

interface IntroTextProps {
  text: string;
}

export default function IntroText({ text }: IntroTextProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <MotionWrapper delay={0.1}>
            <p className="font-display italic text-3xl md:text-4xl text-black leading-relaxed text-balance">
              {text}
            </p>
          </MotionWrapper>
          <MotionWrapper delay={0.3}>
            <div className="mt-6 -ml-2">
              <SvgAccent type="brushstroke" width={320} height={48} className="opacity-80" />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
