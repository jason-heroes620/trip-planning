import InputLabel from '@/components/InputLabel';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import { Link } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';

const Invoice = ({
    auth,
    invoice,
    order,
    proposal,
    proposalProduct,
    proposalItems,
    school,
    orderTotal,
    payment,
}: any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <UserLayout>
            {loading && <Loading />}
            <div className="px-6 py-4 md:px-10 lg:px-20 xl:px-32">
                <div className="flex flex-row items-center gap-10">
                    <div className="py-2">
                        <Button asChild variant={'destructive'}>
                            <Link href={route('invoice.index')}>Back</Link>
                        </Button>
                    </div>
                    <span className="text-lg font-bold">Invoice</span>
                </div>
                <div>
                    <div className="">
                        <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                            <div className="px-2">
                                <InputLabel
                                    htmlFor="invoice_no"
                                    value="Invoice No."
                                    className="py-2 font-bold"
                                />
                                <span className="py-4">
                                    {invoice.invoice_no}
                                </span>
                            </div>
                            <div className="px-2">
                                <InputLabel
                                    htmlFor="invoice_date"
                                    value="Invoice Date"
                                    className="py-2"
                                />
                                <span className="py-4">
                                    {moment(invoice.invoice_date).format(
                                        'DD/MM/YYYY',
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                            <div className="px-2">
                                <InputLabel
                                    htmlFor="invoice_due_date"
                                    value="Invoice Due Date"
                                    className="py-2 font-bold"
                                />
                                <span className="py-4">
                                    {moment(invoice.due_date).format(
                                        'DD/MM/YYYY',
                                    )}
                                </span>
                            </div>
                            {/* <div className="px-2">
                                <InputLabel
                                    htmlFor="invoice_date"
                                    value="Invoice Date"
                                    className="py-2"
                                />
                                <span className="py-4">
                                    {moment(invoice.due_date).format(
                                        'DD/MM/YYYY',
                                    )}
                                </span>
                            </div> */}
                        </div>
                    </div>
                    <hr />
                    <div className="">
                        <div className="flex flex-col py-2 md:grid md:grid-cols-2">
                            <div className="px-2">
                                <InputLabel
                                    htmlFor="order_no"
                                    value="Order No."
                                    className="py-2 font-bold"
                                />
                                <span className="py-4">
                                    <Link
                                        href={route(
                                            'order.view',
                                            order.order_id,
                                        )}
                                    >
                                        {order.order_no}
                                    </Link>
                                </span>
                            </div>
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
                                <span className="flex justify-end font-bold md:col-span-1 md:grid">
                                    Quantity
                                </span>
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
                                <div className="flex md:col-span-3 md:grid">
                                    <span>Deposit</span>
                                </div>
                                <div className="flex flex-row justify-between md:col-span-3">
                                    <div className="justify-end">
                                        <span>1</span>
                                    </div>
                                    <div className="justify-end">
                                        <span>{order.order_amount}</span>
                                    </div>
                                    <div className="justify-end">
                                        <span>{order.order_amount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {order.order_type !== 'D' &&
                            proposalProduct.map((product: any, index: any) => {
                                return (
                                    <div
                                        className="flex flex-col py-4 md:grid md:grid-cols-6"
                                        key={index}
                                    >
                                        <div className="flex md:col-span-3 md:row-span-2">
                                            {product.product.product_name}
                                        </div>

                                        {product.product_price.map((p: any) => {
                                            return (
                                                <div
                                                    className="flex flex-row justify-between md:col-span-3"
                                                    key={p.product_price_id}
                                                >
                                                    <div className="flex justify-end md:col-span-1">
                                                        {p.qty}
                                                    </div>
                                                    <div className="flex justify-end md:col-span-1">
                                                        {p.unit_price}
                                                    </div>
                                                    <div className="flex justify-end md:col-span-1">
                                                        {(
                                                            p.qty * p.unit_price
                                                        ).toFixed(2)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}

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
                    <hr />
                    <div className="flex flex-col gap-2 py-4">
                        {orderTotal.map((o: any, index: number) => {
                            return (
                                <div
                                    className="flex justify-end gap-4"
                                    key={o.order_total_id}
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
                    <div className="flex flex-col px-4 py-4">
                        {payment && (
                            <div>
                                <div className="flex flex-row gap-4">
                                    <span className="font-bold">
                                        Payment Date:{' '}
                                    </span>
                                    <span>
                                        {moment(payment.created).format(
                                            'DD MMM YYYY',
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <span className="font-bold">
                                        Payment Ref:{' '}
                                    </span>
                                    <span>{payment.payment_ref}</span>
                                </div>

                                <div className="flex flex-row gap-4">
                                    <span className="font-bold">
                                        Bank Ref.:{' '}
                                    </span>
                                    <span>{payment.bank_ref}</span>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <span className="font-bold">
                                        Payment Method:{' '}
                                    </span>
                                    <span>{payment.payment_method}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Invoice;
