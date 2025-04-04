import { Card, CardContent } from '@/components/ui/card';
import UserLayout from '@/layout/UserLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment';

export default function Dashboard({
    upcoming_trips,
    proposal_count,
    quotation_count,
    order_count,
}: any) {
    return (
        <UserLayout>
            <Head title="Dashboard" />
            <div className="px-4 py-2 md:px-10 lg:px-20 xl:px-30">
                <div className="py-4">
                    <span className="text-lg font-bold">Dahsboard</span>
                </div>
                <div className="mx-auto flex flex-col gap-6 overflow-x-auto py-4 pb-6 md:flex-row">
                    <Card
                        className={`w-60 border shadow-md md:col-span-1 md:grid`}
                    >
                        <CardContent className="px-4 py-2">
                            <div className="pb-2">
                                <span className="font-semibold">Proposals</span>
                            </div>
                            <div id="content" className="flex flex-col px-4">
                                {proposal_count &&
                                    proposal_count.map(
                                        (p: any, index: number) => {
                                            return p.proposal_status === 0 ? (
                                                <div
                                                    className="flex justify-between"
                                                    key={index}
                                                >
                                                    <span className="text-sm text-gray-500 italic">
                                                        Draft
                                                    </span>
                                                    <span>{p.total}</span>
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex justify-between"
                                                    key={index}
                                                >
                                                    <span className="text-sm text-orange-600 italic">
                                                        Pending Quotation
                                                    </span>
                                                    <span>{p.total}</span>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`w-60 border shadow-md md:col-span-1`}>
                        <CardContent className="px-4 py-2">
                            <div className="pb-2">
                                <span className="font-semibold">
                                    Quotations
                                </span>
                            </div>
                            <div id="content" className="flex flex-col px-4">
                                {quotation_count &&
                                    quotation_count.map(
                                        (p: any, index: number) => {
                                            return p.quotation_status === 0 ? (
                                                <div
                                                    className="flex justify-between"
                                                    key={index}
                                                >
                                                    <span className="text-sm text-red-700 italic">
                                                        In Process
                                                    </span>
                                                    <span>{p.total}</span>
                                                </div>
                                            ) : p.quotation_status === 1 ? (
                                                <div
                                                    className="flex justify-between"
                                                    key={index}
                                                >
                                                    <span className="text-sm text-orange-600 italic">
                                                        Ready For Review
                                                    </span>
                                                    <span>{p.total}</span>
                                                </div>
                                            ) : (
                                                <div
                                                    className="flex justify-between"
                                                    key={index}
                                                >
                                                    <span className="text-sm text-green-700 italic">
                                                        Order Issued
                                                    </span>
                                                    <span>{p.total}</span>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`w-60 border shadow-md md:col-span-1`}>
                        <CardContent className="px-4 py-2">
                            <div className="pb-2">
                                <span className="font-semibold">Order</span>
                            </div>
                            <div id="content" className="flex flex-col px-4">
                                {order_count > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-sm text-orange-600 italic">
                                            Pending Payment
                                        </span>
                                        <span>{order_count}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    {/* <Card className={`w-60 border shadow-md`}>
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
                    </Card> */}
                </div>
                <hr />

                <div className="py-4">
                    <span className="font-bold">Upcoming Trips</span>
                    <div className="flex flex-col py-4 md:grid md:grid-cols-4">
                        {upcoming_trips.length > 0 ? (
                            upcoming_trips.map((u: any) => {
                                return (
                                    <Link
                                        href={route(
                                            'proposal.view',
                                            u.proposal_id,
                                        )}
                                        key={u.proposal_id}
                                        className="flex items-center justify-center"
                                    >
                                        <Card
                                            className={`h-50 w-60 border shadow-md`}
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
                                                        className="h-36 w-full object-cover"
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
                            })
                        ) : (
                            <div className="px-4 py-2">
                                <span className="italic">
                                    No upcoming trip at the moment.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
