import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import States from '@/components/states.json';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const options = States.sort((a, b) => (a > b ? 1 : -1)).map((s) => {
    return { label: s, value: s };
});

type SchoolRegistration = {
    school_name: string;
    address_1: string;
    address_2: string;
    address_3: string;
    city: string;
    postcode: string;
    state: string;
    contact_person: string;
    contact_no: string;
    mobile_no: string;
    email: string;
    school_logo: any[];
};
export default function Register() {
    const { toast } = useToast();
    const { data, setData, post, processing, errors, progress, reset } =
        useForm<SchoolRegistration>({
            school_name: '',
            address_1: '',
            address_2: '',
            address_3: '',
            city: '',
            postcode: '',
            state: '',
            contact_person: '',
            contact_no: '',
            mobile_no: '',
            email: '',
            school_logo: [],
        });

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(e.target.files || []);

        var canUpload = true;
        files.map((f: File) => {
            f.size > 2097152 ? (canUpload = false) : '';
        });
        if (canUpload) {
            setData('school_logo', [...(e.target.files || [])]);
        } else {
            alert('Your file exceede the upload limit.');
        }
    };

    const [openSuccess, setSuccessOpen] = useState(false);
    const [openError, setErrorOpen] = useState(false);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('school.register'), {
            forceFormData: true,
            preserveState: true,
            onSuccess: () => {
                setSuccessOpen(true);
                reset();
                // route('home');
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    description:
                        'There was an issue with your registration. Please try again.',
                });
            },
        });
    };

    const handleRoute = () => {
        router.visit('/');
    };
    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="py-2 text-center">
                <span className="text-bold">Registration Form</span>
            </div>
            <Dialog open={openSuccess}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            Thank you for registering your interest with us. You
                            will receive a confirmation email from us and we
                            will get back to you in 3 - 5 days.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2"></div>
                    <DialogFooter className="justify-end">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => handleRoute()}
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={openError}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                            There was an issue with your registration.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2"></div>
                    <DialogFooter className="justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <form onSubmit={submit}>
                <div>
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="school_name" value="School Name" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="school_name"
                        name="school_name"
                        value={data.school_name}
                        className="mt-1 block w-full"
                        autoComplete="school_name"
                        isFocused={true}
                        onChange={(e) => setData('school_name', e.target.value)}
                        maxLength={150}
                        required
                    />

                    <InputError message={errors.school_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="address_1" value="Address 1" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="address_1"
                        name="address_1"
                        value={data.address_1}
                        className="mt-1 block w-full"
                        autoComplete="address_1"
                        onChange={(e) => setData('address_1', e.target.value)}
                        maxLength={100}
                        required
                    />

                    <InputError message={errors.address_1} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="address_2" value="Address 2" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="address_2"
                        name="address_2"
                        value={data.address_2}
                        className="mt-1 block w-full"
                        autoComplete="address_2"
                        onChange={(e) => setData('address_2', e.target.value)}
                        maxLength={100}
                        required
                    />

                    <InputError message={errors.address_2} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="address_3" value="Address 3" />

                    <TextInput
                        id="address_3"
                        name="address_3"
                        value={data.address_3}
                        className="mt-1 block w-full"
                        autoComplete="address_3"
                        onChange={(e) => setData('address_3', e.target.value)}
                        maxLength={100}
                    />

                    <InputError message={errors.address_3} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="city" value="City" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="city"
                        name="city"
                        value={data.city}
                        className="mt-1 block w-full"
                        autoComplete="city"
                        onChange={(e) => setData('city', e.target.value)}
                        maxLength={100}
                        required
                    />

                    <InputError message={errors.city} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="postcode" value="Postcode" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="postcode"
                        name="postcode"
                        value={data.postcode}
                        className="mt-1 block w-full"
                        autoComplete="postcode"
                        onChange={(e) => setData('postcode', e.target.value)}
                        maxLength={8}
                        required
                    />

                    <InputError message={errors.postcode} className="mt-2" />
                </div>
                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="state" value="State" />
                        <span className="text-red-500">*</span>
                    </div>

                    <SelectInput
                        options={options}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('state', e.target.value)}
                        required
                    />

                    <InputError message={errors.state} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel
                            htmlFor="contact_person"
                            value="Contact Person"
                        />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="contact_person"
                        name="contact_person"
                        value={data.contact_person}
                        className="mt-1 block w-full"
                        autoComplete="contact_person"
                        onChange={(e) =>
                            setData('contact_person', e.target.value)
                        }
                        required
                        maxLength={150}
                    />

                    <InputError
                        message={errors.contact_person}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="contact_no" value="Contact No." />

                    <TextInput
                        id="contact_no"
                        name="contact_no"
                        value={data.contact_no}
                        className="mt-1 block w-full"
                        autoComplete="contact_no"
                        onChange={(e) => setData('contact_no', e.target.value)}
                        maxLength={20}
                    />

                    <InputError message={errors.contact_no} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="mobile_no" value="Mobile No." />
                        <span className="text-red-500">*</span>
                    </div>
                    <TextInput
                        id="mobile_no"
                        name="mobile_no"
                        value={data.mobile_no}
                        className="mt-1 block w-full"
                        autoComplete="mobile_no"
                        onChange={(e) => setData('mobile_no', e.target.value)}
                        maxLength={20}
                        required
                    />

                    <InputError message={errors.mobile_no} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex flex-row gap-2">
                        <InputLabel htmlFor="email" value="Email" />
                        <span className="text-red-500">*</span>
                    </div>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        maxLength={100}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="py-4">
                    <InputLabel
                        htmlFor="school_logo"
                        value="Please Upload Your School Logo (.png, .jpg)"
                        className="pb-2"
                    />
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => handleUploadImage(e)}
                    />
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-end gap-4">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    {/* <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton> */}
                    <Button disabled={processing} variant={'primary'}>
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
