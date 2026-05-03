import Image from 'next/image';

interface ImageDividerProps {
  src: string;
  alt: string;
  height?: string;
}

export default function ImageDivider({
  src,
  alt,
  height = 'h-[55vh] md:h-[70vh]',
}: ImageDividerProps) {
  return (
    <div className={`full-bleed relative ${height} overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
