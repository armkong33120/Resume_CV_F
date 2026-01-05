'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ZoomableImage({ src, alt, className = '', priority = false }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`relative w-full h-full group cursor-zoom-in ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    quality={100}
                    priority={priority}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                    <div className="bg-white/90 p-2 rounded-full shadow-lg">
                        <ZoomIn className="w-6 h-6 text-gray-900" />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        className="fixed top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-[110]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        <X className="w-8 h-8 sm:w-10 sm:h-10" />
                    </button>

                    <div
                        className="w-full h-full overflow-auto flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Use standard img for native resolution behavior in lightbox */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-none w-auto h-auto min-w-full sm:min-w-0 object-contain shadow-2xl"
                            style={{ maxHeight: 'none' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
