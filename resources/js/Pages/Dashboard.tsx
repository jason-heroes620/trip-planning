import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layout/UserLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment';

export default function Dashboard({ upcoming_trips }: any) {
    console.log(upcoming_trips);
    return (
        <UserLayout>
            <Head title="Dashboard" />
            <div className="xl:px-30 px-4 py-2 md:px-10 lg:px-20">
                <div className="py-4">
                    <span className="text-lg font-bold">Dahsboard</span>
                </div>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 overflow-x-auto py-4 pb-6 md:grid-cols-4">
                    <Card className={`w-60 border shadow-md`}>
                        <CardHeader>
                            <CardTitle className="text-lg">Proposals</CardTitle>
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
                            <CardTitle className="text-lg">
                                Quotations
                            </CardTitle>
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
                            <CardTitle className="text-lg">Orders</CardTitle>
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
                            <CardTitle className="text-lg">Invoices</CardTitle>
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
                <hr />

                <div className="py-4">
                    <span className="font-bold">Upcoming Trips</span>
                    <div className="py-4">
                        {upcoming_trips.map((u: any) => {
                            return (
                                <Link
                                    href={route('proposal.view', u.proposal_id)}
                                >
                                    <Card
                                        className={`w-60 border shadow-md`}
                                        key={u.proposal_id}
                                    >
                                        <CardContent className="py-2">
                                            <div
                                                id="content"
                                                className="py flex justify-between gap-10 px-2"
                                            >
                                                <img
                                                    src={u.image}
                                                    alt=""
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="px-2 py-2">
                                                <span className="font-bold">
                                                    {moment(
                                                        u.proposal_date,
                                                    ).format('DD/MMM/YYYY')}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
