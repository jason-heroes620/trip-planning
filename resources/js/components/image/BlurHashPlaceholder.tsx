import { decode } from 'blurhash';
import React, { useEffect, useRef } from 'react';

interface BlurHashPlaceholderProps {
    hash: string;
    width: number;
    height: number;
    punch?: number;
    className?: string;
}

const BlurHashPlaceholder: React.FC<BlurHashPlaceholderProps> = ({
    hash,
    width,
    height,
    punch = 1,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!hash || !canvasRef.current) return;

        try {
            const pixels = decode(hash, width, height, punch);
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            const imageData = ctx.createImageData(width, height);
            imageData.data.set(pixels);
            ctx.putImageData(imageData, 0, 0);
        } catch (error) {
            console.error('Error decoding blurhash:', error);
        }
    }, [hash, width, height, punch]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
        />
    );
};

export default BlurHashPlaceholder;
