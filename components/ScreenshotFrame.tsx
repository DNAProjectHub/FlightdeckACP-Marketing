"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <figure className={`relative ${className}`}>
        <div
          onClick={() => setExpanded(true)}
          className={`relative overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-fd-orange/5 cursor-zoom-in transition-transform duration-200 hover:scale-[1.01] ${
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
          {/* Mask version number in top-right corner */}
          <div
            className="absolute top-0 right-0 w-24 h-8 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(13,13,15,1) 40%, rgba(13,13,15,0) 100%)",
            }}
          />
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-fd-gray">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox */}
      {expanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8"
          onClick={() => setExpanded(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={3840}
              height={2160}
              quality={95}
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg"
            />
            {caption && (
              <p className="mt-3 text-center text-sm text-fd-gray">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
