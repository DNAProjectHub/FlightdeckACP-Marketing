import Image from "next/image";

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  tilt?: boolean;
}

export default function ScreenshotFrame({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  tilt = false,
}: ScreenshotFrameProps) {
  return (
    <figure className={`relative ${className}`}>
      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-fd-orange/5 ${
          tilt ? "transform perspective-[1200px] rotate-y-[-3deg]" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          quality={90}
          priority={priority}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-fd-gray">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
