import Proposal from '@/components/modal/proposal';
import UserLayout from '@/layout/UserLayout';
import { PageProps, Product } from '@/types';
import { usePage } from '@inertiajs/react';
import { Hourglass, MapPin, UsersRound } from 'lucide-react';

const LocationView = ({ auth, flash }: PageProps) => {
    const { product } = usePage<{
        auth: any;
        flash: any;
        product: Product;
    }>().props;

    return (
        <UserLayout>
            <div className="px-4 py-8 md:px-20 lg:px-40">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-[50%]">
                        <div className="px-2">
                            {/* //carousels */}
                            <div className="h-[300px] border"></div>
                        </div>
                    </div>

                    <div className="w-full px-2 py-4 md:w-[50%] md:px-12">
                        <div>
                            <span className="text-lg font-bold">
                                {product.product_name}
                            </span>
                        </div>
                        <div className="flex flex-col py-4">
                            <div className="flex flex-row gap-20">
                                <div className="flex flex-row items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{product.location}</span>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <UsersRound size={16} />
                                    <span>{product.age_group}</span>
                                </div>
                            </div>
                            <div className="py-4">
                                {product.duration ? (
                                    <div className="flex flex-row items-center gap-2">
                                        <Hourglass size={16} />
                                        <span>{product.duration}</span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="flex items-end justify-end py-4">
                                <div>
                                    <span className="text-xl font-bold">
                                        RM{product.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="py-4">
                            <div>
                                <Star size={24}></Star>
                            </div>
                        </div> */}
                        <div className="flex justify-end">
                            {/* <PrimaryButton>Add To Proposal</PrimaryButton> */}
                            <Proposal />
                        </div>
                    </div>
                </div>
                <div className="px-2 py-4 md:px-4">
                    <div className="py-2">
                        <div className="py-2">
                            <span className="text-lg font-bold">
                                Descriptions
                            </span>
                        </div>
                        <div>{product.product_description}</div>
                    </div>
                    <div className="py-4">
                        <div className="py-2">
                            <span className="text-lg font-bold">
                                Activities
                            </span>
                        </div>
                        <div>{product.product_activities}</div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default LocationView;
