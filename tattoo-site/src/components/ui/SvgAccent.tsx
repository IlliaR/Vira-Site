import Image from 'next/image';

type AccentType = 'brushstroke' | 'ink-drip';

interface SvgAccentProps {
  type: AccentType;
  className?: string;
  width?: number;
  height?: number;
}

export default function SvgAccent({ type, className = '', width, height }: SvgAccentProps) {
  const src = `/accents/${type}.svg`;
  const defaultDims = type === 'brushstroke' ? { w: 400, h: 60 } : { w: 120, h: 200 };

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={width ?? defaultDims.w}
      height={height ?? defaultDims.h}
      className={`pointer-events-none select-none ${className}`}
      priority={false}
    />
  );
}
