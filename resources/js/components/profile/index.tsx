import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm, usePage } from '@inertiajs/react';

const ProfileForm = ({ auth }: any) => {
    const {} = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({});

    const handleSubmit = () => {};
    return (
        <div className="py-4">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="px-2 py-4">
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="school">School</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="person_in_charge">
                                    Person In Charge
                                </Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input
                                    type="text"
                                    placeholder="Person In Charge"
                                ></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="email">Email</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="email"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="Contact Nol">Contact No.</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="mobile_no">Mobile No.</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input
                                    type="text"
                                    className="mt-1 block w-full"
                                ></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="address_1">Address 1</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="address_2">Address 2</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="address_3">Address 3</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="city">City</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="postcode">Postcode</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 py-2 md:grid-cols-6 lg:grid-cols-12">
                            <div className="flex items-center md:col-span-1 lg:col-span-2">
                                <Label htmlFor="state">State</Label>
                            </div>
                            <div className="flex md:col-span-5 lg:col-span-10">
                                <Input type="text"></Input>
                            </div>
                        </div>
                        <div>
                            <div className="py-4">
                                <div className="flex flex-col justify-end md:flex-row">
                                    <div className="bborder-t flex items-center border-gray-200 px-4 py-2 dark:border-gray-800 dark:bg-gray-800">
                                        <Button variant="destructive">
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
