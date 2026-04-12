'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <Image
          src={images[mainImageIndex]}
          alt={`${productName} - View ${mainImageIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              mainImageIndex === index
                ? 'border-blue-600'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
