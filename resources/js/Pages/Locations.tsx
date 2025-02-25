import ProductCarousel from '@/components/carousel/productCarousel';
import Pagination from '@/components/pagination';
import { Card, CardContent } from '@/components/ui/card';
import UserLayout from '@/layout/UserLayout';
import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

const Locations = ({ newProducts, products }: any) => {
    const { data, links } = products;
    return (
        <UserLayout>
            <div className="lg:px-30 px-8 py-4 md:px-20">
                <div className="py-4">
                    <span className="text-lg font-bold">Locations</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col py-4">
                        <div className="py-2">
                            <span>What's New</span>
                        </div>
                        <div className="flex justify-center px-2 py-2">
                            <ProductCarousel products={newProducts} />
                        </div>
                    </div>
                    <hr />
                    <div className="w-full flex-1 px-10 py-4">
                        <div className="flex flex-row justify-end">
                            {/* <div className="flex items-center px-4">
                                <Filter className="opacity-40" />
                            </div>
                            <SearchInput
                                className="w-100"
                                type="search"
                            ></SearchInput> */}
                        </div>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {data.map((p: any, i: number) => (
                                    <Link
                                        href={route('location.view', p.id)}
                                        key={p.id}
                                    >
                                        <Card className="h-[350px]">
                                            <CardContent className="flex">
                                                <div className="flex h-full w-full flex-col">
                                                    <img
                                                        src={p.url}
                                                        alt=""
                                                        className="max-h-[200px] min-h-[200px] rounded-t-lg object-cover"
                                                        width="auto"
                                                        height={'auto'}
                                                    />
                                                    <div className="px-4">
                                                        <div className="flex h-[110px] flex-col py-2 pt-4">
                                                            <div>
                                                                <span>
                                                                    {
                                                                        p.product_name
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-row items-center gap-1">
                                                                <MapPin
                                                                    size={14}
                                                                    color="red"
                                                                />
                                                                <small>
                                                                    {p.location}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end">
                                                            <div className="">
                                                                <span className="text-lg font-bold">
                                                                    RM
                                                                    {
                                                                        p.child_price
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                            <Pagination links={links} />
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Locations;
