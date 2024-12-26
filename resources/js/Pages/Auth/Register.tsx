import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/components/SelectInput';
import States from '@/Components/states.json';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const options = States.sort((a, b) => (a > b ? 1 : -1)).map((s) => {
    return { label: s, value: s };
});
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
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
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('school.register'), {
            // onFinish: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="py-2 text-center">
                <span className="text-bold">School Registration Form</span>
            </div>
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
                    <InputLabel htmlFor="mobile_no" value="Mobile No." />

                    <TextInput
                        id="mobile_no"
                        name="mobile_no"
                        value={data.mobile_no}
                        className="mt-1 block w-full"
                        autoComplete="mobile_no"
                        onChange={(e) => setData('mobile_no', e.target.value)}
                        maxLength={20}
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

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
