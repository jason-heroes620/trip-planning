import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
    src: string;
    placeholder?: React.ReactNode;
    alt: string;
    width: number;
    height: number;
    className?: string;
    loading?: 'eager' | 'lazy';
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    placeholder,
    alt,
    width,
    height,
    className = '',
    loading = 'lazy',
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' },
        );

        observer.observe(imgRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isInView || isLoaded) return;

        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => console.error(`Failed to load image: ${src}`);
    }, [isInView, src, isLoaded]);

    const aspectRatio = (height / width) * 100;

    return (
        <div
            ref={imgRef}
            className={`lazy-image-container ${className}`}
            style={{
                position: 'relative',
                paddingBottom: `${aspectRatio}%`,
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
            }}
        >
            {placeholder && !isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {placeholder}
                </div>
            )}

            {(isLoaded || loading === 'eager') && (
                <img
                    src={src}
                    alt={alt}
                    loading={loading}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    style={{
                        transition: 'opacity 0.3s ease',
                        opacity: isLoaded ? 1 : 0,
                    }}
                    width={width}
                    height={height}
                    decoding="async"
                />
            )}
        </div>
    );
};

export default LazyImage;
