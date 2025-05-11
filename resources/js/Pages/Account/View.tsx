import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import Loading from '@/components/loading';
import SelectInput from '@/components/SelectInput';
import States from '@/components/states.json';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UserLayout from '@/layout/UserLayout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const states = States.sort((a, b) => (a > b ? 1 : -1)).map((s) => {
    return { label: s, value: s };
});

const View = ({ school, school_logo }: any) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const { data, setData, post, put, processing, errors } = useForm({
        school_name: school.school_name,
        address_1: school.address_1,
        address_2: school.address_2,
        address_3: school.address_3 || '',
        city: school.city || '',
        postcode: school.postcode || '',
        state: school.state || '',
        contact_person: school.contact_person,
        email: school.email,
        contact_no: school.contact_no || '',
        mobile_no: school.mobile_no || '',
        school_logo: school_logo,
        school_status: school.school_status,
        google_place_name: school.google_place_name || '',
    });
    const [logo, setLogo] = useState<File>();

    const handleMainFileUpload = (e: any) => {
        const files: File = e.target.files[0];
        var canUpload = true;
        files.size > 1048576 ? (canUpload = false) : '';
        if (canUpload) {
            setLogo(files);
            setData('school_logo', e.target.files[0]);
        } else {
            alert('1 or more files exceed the upload limit.');
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('account.update', school.school_id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast({
                    variant: 'default',
                    description: 'Your account information is updated!',
                });
            },
            onError: (errors) => {
                ({
                    variant: 'desctructive',
                    description:
                        'Your attempt to update your account information has failed!',
                });
            },
        });
    };
    return (
        <UserLayout>
            {loading && <Loading />}
            <div className="px-6 py-4 md:px-10 lg:px-20 xl:px-32">
                <div className="flex flex-row items-center gap-10">
                    <div className="py-2">
                        <span className="text-lg font-bold">Account</span>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="py-4">
                        <div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="school_name"
                                        value="School"
                                    />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <TextInput
                                        id="school"
                                        name="school_name"
                                        type="text"
                                        value={data.school_name}
                                        className="mt-1 block w-full"
                                        autoComplete="school_name"
                                        onChange={(e) =>
                                            setData(
                                                'school_name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        maxLength={150}
                                    />
                                </div>
                                <InputError
                                    message={errors.school_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="address_1"
                                        value="Address 1"
                                    />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <TextInput
                                        id="address_1"
                                        name="address_1"
                                        type="text"
                                        value={data.address_1}
                                        className="mt-1 block w-full"
                                        autoComplete="address_1"
                                        onChange={(e) =>
                                            setData('address_1', e.target.value)
                                        }
                                        required
                                        maxLength={100}
                                    />
                                </div>
                                <InputError
                                    message={errors.address_1}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="address_2"
                                        value="Address 2"
                                    />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <TextInput
                                        id="address_2"
                                        name="address_2"
                                        type="text"
                                        value={data.address_2}
                                        className="mt-1 block w-full"
                                        autoComplete="address_2"
                                        onChange={(e) =>
                                            setData('address_2', e.target.value)
                                        }
                                        maxLength={100}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.address_2}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="address_3"
                                        value="Address 3"
                                    />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <TextInput
                                        id="address_3"
                                        name="address_3"
                                        type="text"
                                        value={data.address_3}
                                        className="mt-1 block w-full"
                                        autoComplete="address_3"
                                        onChange={(e) =>
                                            setData('address_3', e.target.value)
                                        }
                                        maxLength={100}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 md:gap-4 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel htmlFor="city" value="City" />
                                </div>
                                <div className="flex md:col-span-2 lg:col-span-4">
                                    <TextInput
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={data.city}
                                        className="mt-1 block w-full"
                                        autoComplete="city"
                                        onChange={(e) =>
                                            setData('city', e.target.value)
                                        }
                                        maxLength={100}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.city}
                                    className="mt-2"
                                />
                                <div className="flex items-center pt-4 md:col-span-1 md:pt-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="postcode"
                                        value="Postcode"
                                    />
                                </div>
                                <div className="flex md:col-span-2 lg:col-span-4">
                                    <TextInput
                                        id="postcode"
                                        name="postcode"
                                        type="text"
                                        value={data.postcode}
                                        className="mt-1 block w-full"
                                        autoComplete="postcode"
                                        onChange={(e) =>
                                            setData('postcode', e.target.value)
                                        }
                                        maxLength={12}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.postcode}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel htmlFor="state" value="State" />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <SelectInput
                                        options={states}
                                        selected={data.state}
                                        onChange={(e) => {
                                            setData('state', e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel htmlFor="email" value="Email" />
                                </div>
                                <div className="flex md:col-span-5 lg:col-span-10">
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full bg-gray-100"
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        required
                                        maxLength={100}
                                        disabled
                                    />
                                </div>
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 md:gap-4 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="contact_no"
                                        value="Contact No."
                                    />
                                </div>
                                <div className="flex md:col-span-2 lg:col-span-4">
                                    <TextInput
                                        id="contact_no"
                                        name="contact_no"
                                        type="text"
                                        value={data.contact_no}
                                        className="mt-1 block w-full"
                                        autoComplete="contact_no"
                                        onChange={(e) =>
                                            setData(
                                                'contact_no',
                                                e.target.value,
                                            )
                                        }
                                        maxLength={20}
                                    />
                                </div>
                                <InputError
                                    message={errors.contact_no}
                                    className="mt-2"
                                />
                                <div className="flex items-center pt-4 md:col-span-1 md:pt-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="mobile_no"
                                        value="Mobile No."
                                    />
                                </div>
                                <div className="flex md:col-span-2 lg:col-span-4">
                                    <TextInput
                                        id="mobile_no"
                                        name="mobile_no"
                                        type="tel"
                                        value={data.mobile_no}
                                        className="mt-1 block w-full"
                                        autoComplete="mobile_no"
                                        onChange={(e) =>
                                            setData('mobile_no', e.target.value)
                                        }
                                        maxLength={20}
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.mobile_no}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2">
                                    <InputLabel
                                        htmlFor="images"
                                        value="School Logo"
                                        className="pb-2"
                                    />
                                </div>
                                <div className="flex flex-col md:col-span-5 lg:col-span-10">
                                    <input
                                        type="file"
                                        multiple={false}
                                        accept=".png,.jpg,.jpeg"
                                        onChange={(e) => {
                                            handleMainFileUpload(e);
                                        }}
                                    />
                                    <small>
                                        (supported formats .png, .jpg. Image
                                        should not be more than 1 MB)
                                    </small>
                                </div>
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-1 py-2 md:grid-cols-6 lg:grid-cols-12">
                                <div className="flex items-center md:col-span-1 lg:col-span-2"></div>
                                {school_logo && (
                                    <div className="flex h-32 w-32 items-center justify-center px-2">
                                        <img
                                            src={school_logo}
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-end gap-8 py-4 md:flex-row">
                                <div className="py-4">
                                    <Button type="submit" disabled={processing}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default View;
