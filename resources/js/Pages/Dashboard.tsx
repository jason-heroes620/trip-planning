import UserLayout from '@/layout/UserLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <UserLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
            </div>
        </UserLayout>
    );
}
