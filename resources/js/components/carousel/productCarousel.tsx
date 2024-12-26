import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';

const ProductCarousel = ({ products }: any) => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <Carousel
            className="w-[80%] max-w-xs px-2 md:w-[70%] md:max-w-5xl lg:w-full lg:max-w-7xl"
            plugins={[plugin.current]}
        >
            <CarouselContent className="-ml-1">
                {products.map((p) => (
                    <CarouselItem
                        className="md:basis-1/3 md:pl-6 lg:basis-1/4"
                        key={p.id}
                    >
                        <Link href={route('location.view', p.id)}>
                            <Card className="h-[350px]">
                                <CardContent className="flex">
                                    <div className="flex h-full w-full flex-col">
                                        <img
                                            src={p.url}
                                            alt=""
                                            className="flex h-[180px] justify-center object-cover py-2"
                                            width={'auto'}
                                            height={'auto'}
                                        />
                                        <div className="flex h-[120px] flex-col py-2">
                                            <div>
                                                <span>{p.product_name}</span>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <MapPin size={14} color="red" />
                                                <small>{p.location}</small>
                                            </div>
                                        </div>
                                        <div className="flex h-[50px] items-center justify-end">
                                            <div className="">
                                                <span className="text-lg font-bold">
                                                    RM{p.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ProductCarousel;
