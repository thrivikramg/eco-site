"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CloudinaryVideoProps {
  publicId: string;
  height?: number;
  width?: number;
  alt: string;
  fallbackImageUrl: string;
  className?: string;
}

export default function CloudinaryVideo({
  publicId,
  height,
  width,
  alt,
  fallbackImageUrl,
  className = "",
}: CloudinaryVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    if (cloudName && publicId) {
      setVideoUrl(`https://res.cloudinary.com/${cloudName}/video/upload/${publicId}`);
    }
  }, [cloudName, publicId]);

  return (
    <div className={`relative ${className}`}>
      {videoUrl ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          poster={fallbackImageUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <img 
            src={fallbackImageUrl} 
            alt={alt} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </video>
      ) : (
        <Image
          src={fallbackImageUrl}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );
}