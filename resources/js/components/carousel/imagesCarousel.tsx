import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const ImagesCarousel = ({ images }: any) => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <Carousel
            className="w-full max-w-xs md:max-w-md"
            plugins={[plugin.current]}
        >
            <CarouselContent className="">
                {images.map((p: any) => (
                    <CarouselItem key={p.id}>
                        <Card className="border-0">
                            <CardContent className="flex">
                                <div className="flex h-full w-full flex-col">
                                    <img
                                        src={p.url}
                                        alt=""
                                        className="h-[300px] rounded-t-lg object-contain"
                                        width="auto"
                                        height={'auto'}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ImagesCarousel;
