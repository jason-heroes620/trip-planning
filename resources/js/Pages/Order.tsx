import Checkbox from '@/components/Checkbox';
import InputLabel from '@/components/InputLabel';
import Loading from '@/components/loading';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import { Link, router } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import TOSPage from './TOSPage';

const Order = ({
    auth,
    order,
    proposal,
    proposalProduct,
    proposalItems,
    school,
    discount,
    fees,
    total,
    orderTotal,
}: any) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleMakePayment = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setOpen(false);
        router.visit(route('payment.process', order.order_id));
    };

    const [tacUnChecked, setTacUnchecked] = useState(true);
    const paymentDialog = () => {
        return (
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="primary"
                        disabled={order.order_status === 2 ? true : false}
                    >
                        Make Payment
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="flex flex-col">
                                <span> Confirm to make payment?</span>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        onChange={() =>
                                            setTacUnchecked(!tacUnChecked)
                                        }
                                    />
                                    <span>
                                        I have read and agree to the
                                        {/* <Link
                                            href={route('termsOfService')}
                                            target="_blank"
                                            className="underline"
                                        >
                                            Terms & Conditions
                                        </Link> */}
                                    </span>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="link">
                                                Terms & Conditions
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-screen max-w-[425px] overflow-y-scroll md:max-w-[600px]">
                                            <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription>
                                                    <TOSPage />
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4"></div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                    >
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={loading || tacUnChecked ? true : false}
                            onClick={(e) => handleMakePayment(e)}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    return (
        <UserLayout>
            {loading && <Loading />}
            <div className="px-6 py-4 md:px-10 lg:px-20 xl:px-32">
                <div className="flex flex-row items-center gap-10">
                    <div className="py-2">
                        <Button asChild variant={'destructive'}>
                            <Link href={route('orders')}>Back</Link>
                        </Button>
                    </div>
                    <span className="text-lg font-bold">Order</span>
                </div>
                <div>
                    <div>
                        <div className="">
                            <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="order_no"
                                        value="Order No."
                                        className="py-2 font-bold"
                                    />
                                    <span className="py-4">
                                        {order.order_no}
                                    </span>
                                </div>
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="order_date"
                                        value="Order Date"
                                        className="py-2"
                                    />
                                    <span className="py-4">
                                        {moment(order.order_date).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="order_due_date"
                                        value="Payment Due Date"
                                        className="py-2 font-bold"
                                    />
                                    <span className="py-4">
                                        {moment(order.due_date).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </span>
                                </div>
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="payment_status"
                                        value="Payment Status"
                                        className="py-2"
                                    />

                                    {order.order_status === 0 ? (
                                        <span className="py-4 font-bold text-orange-600">
                                            Pending Payment
                                        </span>
                                    ) : order.order_status === 1 ? (
                                        <span className="py-4 font-bold text-orange-600">
                                            Pending Payment
                                        </span>
                                    ) : order.order_status === 2 ? (
                                        <span className="py-4 font-bold text-green-800">
                                            Paid
                                        </span>
                                    ) : order.order_status === 3 ? (
                                        <span className="py-4 font-bold text-red-800">
                                            Cancelled
                                        </span>
                                    ) : (
                                        <span className="py-4 font-bold text-red-800">
                                            Payment Failed
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="">
                            <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="proposal_name"
                                        value="Proposal Name"
                                        className="py-2"
                                    />
                                    <span className="py-4">
                                        <Link
                                            target="_blank"
                                            href={route(
                                                'proposal.view',
                                                proposal.proposal_id,
                                            )}
                                        >
                                            {proposal.proposal_name}
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col py-4 md:grid md:grid-cols-2">
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="proposal_date"
                                        value="Proposed Visitation Date"
                                        className="py-2"
                                    />
                                    <span className="py-4">
                                        {moment(proposal.proposal_date).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </span>
                                </div>
                                <div className="px-2">
                                    <InputLabel
                                        htmlFor="No. of Students / No. of Teachers"
                                        value="No. of Students / No. of Teachers"
                                        className="py-2"
                                    />
                                    <span className="py-4">
                                        {proposal.qty_student} /{' '}
                                        {proposal.qty_teacher}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="">
                            <div className="flex flex-col border-b-2 py-4 md:grid md:grid-cols-6">
                                <span className="flex font-bold md:col-span-3 md:row-span-2 md:grid">
                                    Item
                                </span>
                                <div className="flex flex-row justify-between md:col-span-3">
                                    <div className="flex justify-end md:col-span-1 md:grid">
                                        <span className="font-bold">
                                            Quantity
                                        </span>
                                    </div>
                                    <span className="flex justify-end font-bold md:col-span-1 md:grid">
                                        Unit Price (RM)
                                    </span>
                                    <span className="flex justify-end font-bold md:col-span-1 md:grid">
                                        Amount (RM)
                                    </span>
                                </div>
                            </div>

                            {order.order_type === 'D' && (
                                <div className="flex flex-col py-4 md:grid md:grid-cols-6">
                                    <div className="flex md:col-span-3">
                                        <span>Deposit</span>
                                    </div>

                                    <div className="flex flex-row justify-between md:col-span-3">
                                        <div className="flex justify-end md:col-span-1 md:grid">
                                            <span>1</span>
                                        </div>
                                        <div className="flex justify-end md:col-span-1 md:grid">
                                            <span>{order.order_amount}</span>
                                        </div>
                                        <div className="flex md:col-span-1 md:grid">
                                            <span>{order.order_amount}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {order.order_type !== 'D' &&
                                proposalProduct.map(
                                    (product: any, index: any) => {
                                        return (
                                            <div
                                                className="flex flex-col py-4 md:grid md:grid-cols-6"
                                                key={index}
                                            >
                                                <div className="flex md:col-span-3 md:row-span-2">
                                                    {
                                                        product.product
                                                            .product_name
                                                    }
                                                </div>

                                                {product.product_price.map(
                                                    (p: any) => {
                                                        return (
                                                            <div
                                                                className="flex flex-row justify-between md:col-span-3"
                                                                key={
                                                                    p.product_price_id
                                                                }
                                                            >
                                                                <div className="flex md:col-span-1 md:justify-end">
                                                                    {p.qty}
                                                                </div>
                                                                <div className="flex justify-end md:col-span-1">
                                                                    {
                                                                        p.unit_price
                                                                    }
                                                                </div>
                                                                <div className="flex justify-end md:col-span-1">
                                                                    {(
                                                                        p.qty *
                                                                        p.unit_price
                                                                    ).toFixed(
                                                                        2,
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        );
                                    },
                                )}

                            {order.order_type !== 'D' &&
                                proposalItems.map((item: any, index: any) => {
                                    return (
                                        <div
                                            className="flex flex-col py-4 md:grid md:grid-cols-6"
                                            key={index}
                                        >
                                            <div className="flex md:col-span-3">
                                                {item.item_name}
                                            </div>

                                            <div className="flex flex-row justify-between md:col-span-3">
                                                <div className="flex justify-end md:col-span-1 md:grid">
                                                    {item.item_qty}
                                                </div>
                                                <div className="flex justify-end md:col-span-1 md:grid">
                                                    {item.unit_price}
                                                </div>
                                                <div className="flex md:col-span-1 md:grid">
                                                    {(
                                                        item.item_qty *
                                                        item.unit_price
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-2 py-4">
                        {orderTotal.map((o: any, index: number) => {
                            return (
                                <div
                                    className="flex justify-end gap-4"
                                    key={index}
                                >
                                    <span className="font-bold">{o.title}</span>
                                    <span className="font-bold">
                                        {formattedNumber(o.value)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className="flex justify-end py-4">
                        <div>{paymentDialog()}</div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Order;
