import ProductCarousel from '@/components/carousel/productCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search';
import UserLayout from '@/layout/UserLayout';
import { PageProps, PaginatedData, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Filter } from 'lucide-react';

const Locations = ({ auth, flash }: PageProps) => {
    const { newProducts, products } = usePage<{
        auth: any;
        flash: any;
        newProducts: Product;
        products: PaginatedData<Product>;
    }>().props;
    console.log('new products =>', newProducts);
    return (
        <UserLayout>
            <div className="px-2 py-4 md:px-8">
                <div>Locations</div>
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
                            <div className="flex items-center px-4">
                                <Filter className="opacity-40" />
                            </div>
                            <SearchInput
                                className="w-100"
                                type="search"
                            ></SearchInput>
                        </div>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <Card className="flex h-[400px] justify-center">
                                        <CardContent className="flex items-center justify-center p-6">
                                            <span className="text-2xl font-semibold">
                                                {index + 1}
                                            </span>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Locations;
