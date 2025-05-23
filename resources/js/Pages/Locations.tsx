import ProductCarousel from '@/components/carousel/productCarousel';
import BlurHashPlaceholder from '@/components/image/BlurHashPlaceholder';
import LazyImage from '@/components/image/LazyImage';
import Pagination from '@/components/pagination';
import SearchFilter from '@/components/SearchFilter';
import { Card, CardContent } from '@/components/ui/card';
import UserLayout from '@/layout/UserLayout';
import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

const Locations = ({
    // newProducts,
    products,
    featured,
    liked,
    like_more,
    filters,
    search,
    filter,
}: any) => {
    const { data, links, to, from, total } = products;
    let linkFilter = '';
    let linkSearch = '';

    if (filter !== null || search !== '') {
        if (filter !== null) {
            filter.map((f: any, index: number) => {
                linkFilter = `${linkFilter}&filter[${index}]=${f}`;
            });
        }
        if (search !== '' && search !== null) {
            linkSearch = `${linkSearch}&search=${search}`;
        }
        links.map((l: any) => {
            l.url = l.url ? `${l.url}${linkSearch}${linkFilter}` : '';
        });
    }

    const product = data.filter(
        (o: any, index: number, arr: any) =>
            arr.findIndex(
                (item: any) => JSON.stringify(item.id) === JSON.stringify(o.id),
            ) === index,
    );

    return (
        <UserLayout>
            <div className="px-4 py-4 md:px-10 lg:px-18 xl:px-24">
                <div className="py-4">
                    <span className="text-lg font-bold">Locations</span>
                </div>
                <div className="flex flex-col">
                    {/* <div className="flex flex-col pb-6">
                        <div className="py-2">
                            <span className="font-semibold">What's New</span>
                        </div>
                        <div className="flex justify-center px-2 py-2">
                            <ProductCarousel products={newProducts} />
                        </div>
                    </div>
                    <hr /> */}
                    <div className="flex flex-col pb-6">
                        <div className="py-2">
                            <span className="font-semibold">Featured</span>
                        </div>
                        <div className="flex justify-center px-2 py-2">
                            <ProductCarousel products={featured} />
                        </div>
                    </div>
                    <div className="py-4">
                        <hr />
                    </div>
                    <div className="w-full flex-1 px-4 py-4 md:px-4 lg:px-10">
                        <div className="flex flex-row md:justify-end">
                            <SearchFilter
                                filters={filters}
                                search={search}
                                filter={filter}
                            />
                        </div>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                {product.length > 0 ? (
                                    product.map((p: any) => {
                                        return (
                                            <Link
                                                href={route(
                                                    'location.view',
                                                    p.id,
                                                )}
                                                key={p.id}
                                            >
                                                <Card className="h-[350px]">
                                                    <CardContent className="flex">
                                                        <div className="flex h-full w-full flex-col">
                                                            {/* <img
                                                                src={p.url}
                                                                alt=""
                                                                className="block max-h-[200px] min-h-[200px] w-full rounded-t-lg object-cover"
                                                                width="auto"
                                                                height={'auto'}
                                                                loading={'lazy'}
                                                            /> */}
                                                            <LazyImage
                                                                src={p.url}
                                                                placeholder={
                                                                    p.url ? (
                                                                        <BlurHashPlaceholder
                                                                            hash={
                                                                                p.url
                                                                            }
                                                                            width={
                                                                                16
                                                                            }
                                                                            height={
                                                                                2
                                                                            }
                                                                            className="absolute inset-0"
                                                                        />
                                                                    ) : null
                                                                }
                                                                alt={'img'}
                                                                width={6}
                                                                height={3.6}
                                                                className="rounded-t-lg shadow-md transition-shadow hover:shadow-lg"
                                                            />

                                                            <div className="px-4">
                                                                <div className="flex h-[110px] flex-col py-2 pt-4">
                                                                    <div>
                                                                        <span className="line-clamp-2">
                                                                            {
                                                                                p.product_name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-row items-center gap-1">
                                                                        <MapPin
                                                                            size={
                                                                                14
                                                                            }
                                                                            color="red"
                                                                        />
                                                                        <small>
                                                                            {
                                                                                p.location
                                                                            }
                                                                        </small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="line-clamp-1 italic">
                                                                            {
                                                                                p.filters
                                                                            }
                                                                        </small>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-end">
                                                                    <div className="">
                                                                        <span className="text-lg font-bold">
                                                                            RM
                                                                            {
                                                                                p.student_price
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="flex justify-center py-6 md:col-span-4">
                                        <span>No product found</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 py-4">
                                <Pagination links={links} />
                                {from && (
                                    <span className="text-sm">
                                        Showing {from} - {to} of {total} records
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <hr />
                    </div>

                    {liked.length > 0 && (
                        <div className="flex flex-col pb-6">
                            <div className="py-2">
                                <span className="font-semibold">My Likes</span>
                            </div>
                            {like_more && (
                                <div className="flex justify-end px-6">
                                    <Link href={route('locations.likes')}>
                                        <span className="font-semibold italic">
                                            Show More {'>>'}
                                        </span>
                                    </Link>
                                </div>
                            )}
                            <div className="flex justify-center px-2 py-2">
                                <ProductCarousel products={liked} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default Locations;
