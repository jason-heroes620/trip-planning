import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layout/UserLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <UserLayout>
            <Head title="Dashboard" />
            <div className="px-4 py-2 md:px-10 lg:px-20 xl:px-40">
                <div className="py-4">
                    <span className="text-lg font-bold">Dahsboard</span>
                </div>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 overflow-x-auto md:grid-cols-4">
                    <Card className={`w-60 border shadow-md`}>
                        <CardHeader>
                            <CardTitle className="text-lg">Proposal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                id="content"
                                className="py flex justify-between gap-10 px-2"
                            >
                                <span className="text-lg font-extrabold italic"></span>
                                <span className="text-xl font-bold"></span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`w-60 border shadow-md`}>
                        <CardHeader>
                            <CardTitle className="text-lg">Quotation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                id="content"
                                className="py flex justify-between gap-10 px-2"
                            >
                                <span className="text-lg font-extrabold italic"></span>
                                <span className="text-xl font-bold"></span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`w-60 border shadow-md`}>
                        <CardHeader>
                            <CardTitle className="text-lg">Invoice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                                id="content"
                                className="py flex justify-between gap-10 px-2"
                            >
                                <span className="text-lg font-extrabold italic"></span>
                                <span className="text-xl font-bold"></span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </UserLayout>
    );
}
