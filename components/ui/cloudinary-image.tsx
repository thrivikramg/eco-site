"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  fallbackSrc?: string;
  transformations?: string;
  responsive?: boolean;
}

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  crop = "fill",
  aspectRatio,
  className = "",
  priority = false,
  quality = 80,
  fallbackSrc,
  transformations = "",
  responsive = false,
}: CloudinaryImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imgWidth, setImgWidth] = useState<number | undefined>(width);
  const [imgHeight, setImgHeight] = useState<number | undefined>(height);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dc2mzcoqr"; // Fallback to your cloud name

  useEffect(() => {
    if (!cloudName || !publicId) return;

    let transformationString = `q_${quality}`;

    if (crop) {
      transformationString += `,c_${crop}`;
    }

    if (aspectRatio) {
      transformationString += `,ar_${aspectRatio}`;
    }

    if (transformations) {
      transformationString += `,${transformations}`;
    }

    if (width && height) {
      transformationString += `,w_${width},h_${height}`;
      setImgWidth(width);
      setImgHeight(height);
    } else if (responsive) {
      // Set a default size for responsive images
      setImgWidth(1200);
      setImgHeight(800);
    }

    const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
    setImageUrl(url);
  }, [cloudName, publicId, width, height, crop, aspectRatio, transformations, quality, responsive]);

  if (!imageUrl) {
    return fallbackSrc ? (
      <img 
        src={fallbackSrc}
        alt={alt}
        className={className}
        width={imgWidth}
        height={imgHeight}
      />
    ) : null;
  }

  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
      <Image
        src={imageUrl}
        alt={alt}
        fill={!imgWidth || !imgHeight}
        width={imgWidth}
        height={imgHeight}
        style={{ objectFit: 'cover' }}
        priority={priority}
        quality={quality}
        sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
      />
    </div>
  );
}
