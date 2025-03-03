import ImagesCarousel from '@/components/carousel/imagesCarousel';
import Proposal from '@/components/modal/proposal';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layout/UserLayout';
import { Product } from '@/types';
import { renderHTML } from '@/util/renderHtml';
import { secondsToHms } from '@/util/secondsToHms';
import { router, usePage } from '@inertiajs/react';
import { Hourglass, MapPin, UsersRound, Utensils } from 'lucide-react';

import '../../css/style.css';

const Location = () => {
    const { product, productDetail, productImages } = usePage<{
        auth: any;
        flash: any;
        product: Product;
        productDetail: any;
        productImages: any[];
        product_desription: string;
    }>().props;
    const { props } = usePage();
    const previousUrl = props.previousUrl || '/';

    return (
        <UserLayout>
            <div className="px-4 py-4 md:px-8 lg:px-16 xl:px-24">
                <div className="py-2">
                    <Button
                        variant={'destructive'}
                        onClick={() => router.visit(previousUrl.toString())}
                    >
                        Back
                    </Button>
                </div>
                <div className="flex flex-col items-center py-4 md:max-h-[400px] md:flex-row md:gap-6">
                    <div className="flex w-full justify-center md:w-[50%]">
                        <div className="px-10">
                            <ImagesCarousel images={productImages} />
                        </div>
                    </div>

                    <div className="flex w-full flex-col rounded-lg border bg-orange-50 px-4 py-4 md:w-[50%] md:gap-2 md:px-8 lg:px-10">
                        <div>
                            <span className="line-clamp-2 text-lg font-bold">
                                {product.product_name}
                            </span>
                        </div>
                        <div className="flex flex-col py-4 md:py-2">
                            <div className="flex flex-col py-2 md:grid md:grid-cols-2 md:gap-2">
                                <div className="flex flex-row items-center gap-2 md:col-span-2">
                                    <MapPin size={16} color="red" />
                                    <span className="text-md">
                                        {product.location}
                                    </span>
                                </div>
                            </div>

                            <div className="py grid grid-cols-2 gap-4">
                                <div className="col-span-1 flex items-center gap-2">
                                    <UsersRound size={16} color="red" />
                                    <span className="text-sm">
                                        {product.age_group} years old
                                    </span>
                                </div>
                                <div className="col-span-1 flex items-center gap-2">
                                    <div className="flex justify-start md:min-w-[55px]">
                                        <Hourglass size={16} color="red" />
                                    </div>

                                    <span className="text-sm">
                                        {secondsToHms(
                                            parseInt(product.duration),
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="py grid grid-cols-2 gap-4">
                                <div className="col-span-1 flex items-center gap-2">
                                    <Utensils size={16} color="red" />
                                    <span className="text-sm">
                                        {product.food_allowed === 0
                                            ? 'Allowed'
                                            : 'Not Allowed'}
                                    </span>
                                </div>
                                <div className="col-span-1 flex items-center gap-2">
                                    <span className="text-sm">Min/Max</span>
                                    <span className="text-sm">
                                        {product.min_quantity}/
                                        {product.max_quantity}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-end py-4">
                                <div className="flex flex-row items-center gap-2">
                                    <small>(student)</small>
                                    <span className="text-xl font-bold text-[#F86F3E]">
                                        RM{product.student_price}
                                    </span>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <small>(teacher)</small>
                                    <span className="text-xl font-bold text-[#F86F3E]">
                                        RM{product.teacher_price}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="py-4">
                            <div>
                                <Star size={24}></Star>
                            </div>
                        </div> */}
                        <div className="flex justify-end py-2">
                            {/* <PrimaryButton>Add To Proposal</PrimaryButton> */}
                            <Proposal product={product} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col px-2 py-2 md:px-10 lg:px-20">
                    <div className="flex flex-col py-2">
                        <div className="py-2">
                            <span className="text-lg font-bold">
                                Descriptions
                            </span>
                        </div>
                        <div>{renderHTML(product.product_description)}</div>
                    </div>

                    {product.product_activities && (
                        <div className="flex flex-col py-4">
                            <div className="py-2">
                                <span className="text-lg font-bold">
                                    Activities
                                </span>
                            </div>
                            <div className="list-disc">
                                {renderHTML(product.product_activities)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default Location;
