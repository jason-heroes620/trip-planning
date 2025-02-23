import Checkbox from '@/components/Checkbox';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
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
import { useToast } from '@/hooks/use-toast';
import UserLayout from '@/layout/UserLayout';
import { Fees, ProposalItem } from '@/types';
import { formattedNumber } from '@/util/formatNumber';
import { renderHTML } from '@/util/renderHtml';
import { secondsToHms } from '@/util/secondsToHms';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { Hourglass, MapPin, UsersRound } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

const Quotation = ({
    quotation,
    proposal,
    quotation_product,
    quotation_item,
    prices,
    quotation_discount,
    fees,
}: any) => {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const productTotal = prices.reduce(
        (sum: number, p: any) =>
            sum + parseInt(p.qty) * parseFloat(p.unit_price),
        0.0,
    );

    const optionTotal = quotation_item.reduce(
        (sum: number, p: any) =>
            sum + parseFloat(p.item_qty) * parseFloat(p.unit_price),
        0.0,
    );

    const discountTotal = quotation_discount
        ? quotation_discount.discount_type === 'F'
            ? parseFloat(quotation_discount.discount_amount)
            : ((productTotal + optionTotal) *
                  quotation_discount.discount_amount) /
              100
        : 0;

    const feeTotal = fees.reduce(
        (sum: number, p: any) =>
            sum +
            (p.fee_type === 'P'
                ? ((parseFloat(productTotal) + parseFloat(optionTotal)) *
                      parseFloat(p.fee_amount)) /
                  100
                : p.fee_amount),
        0.0,
    );
    const total = productTotal + optionTotal + feeTotal - discountTotal;

    // const calculateTrasportation = (unit: string, additional: string) => {
    //     let value =
    //         parseFloat(unit) +
    //         parseFloat(additional) *
    //             Math.round(parseInt(proposal.travel_distance) / 1000);
    //     return value;
    // };

    const handleAcceptQuotation = (e: any) => {
        e.preventDefault();
        // console.log('Accept Quotation');
        axios
            .patch(route('quotation.accept', quotation.quotation_id), {
                quotation_amount: total,
            })
            .then((resp) => {
                if (resp.data.success) {
                    toast({
                        variant: 'default',
                        title: 'Quotation Accepted!',
                        description: resp.data.success,
                    });
                    router.visit(
                        route('quotation.view', quotation.quotation_id),
                    );
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Quotation Error!',
                        description: resp.data.failed,
                    });
                }
                setOpen(false);
            });
    };

    return (
        <UserLayout>
            <div className="px-6 py-4 md:px-10 lg:px-20 xl:px-40">
                <div className="flex flex-row items-center gap-10">
                    <div className="py-2">
                        <Button asChild variant={'destructive'}>
                            <Link href={route('quotation.index')}>Back</Link>
                        </Button>
                    </div>
                    <span className="text-lg font-bold">Quotation</span>
                </div>
                <div className="py-2 pb-6">
                    <div className="py-2">
                        <span className="font-bold">
                            {proposal.proposal_name}
                        </span>
                    </div>
                    <form className="flex flex-col gap-4 md:grid md:grid-cols-2">
                        <div>
                            <InputLabel>Quotation No.</InputLabel>
                            <TextInput
                                id="quotation_no"
                                name="quotation_no"
                                defaultValue={quotation.quotation_no}
                                className="mt-1 block w-full"
                                disabled
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel>Quotation Date</InputLabel>
                            <TextInput
                                id="quotation_date"
                                name="quotation_date"
                                defaultValue={moment(
                                    quotation.quotation_date,
                                ).format('DD/MM/YYYY')}
                                className="mt-1 block w-full"
                                disabled
                                type="text"
                            />
                        </div>
                        <div>
                            <InputLabel>No. of Students</InputLabel>
                            <TextInput
                                id="qty_student"
                                name="qty_student"
                                defaultValue={proposal.qty_student}
                                className="mt-1 block w-full"
                                type="number"
                                disabled
                            />
                        </div>
                        <div>
                            <InputLabel>No. of Teachers</InputLabel>
                            <TextInput
                                id="qty_teacher"
                                name="qty_teacher"
                                defaultValue={proposal.qty_teacher}
                                className="mt-1 block w-full"
                                disabled
                            />
                        </div>
                        <div>
                            <InputLabel>Proposed Visitation Date</InputLabel>
                            <TextInput
                                id="proposal_date"
                                name="proposal_date"
                                defaultValue={moment(
                                    proposal.proposal_date,
                                ).format('DD/MM/YYYY')}
                                className="mt-1 block w-full"
                                disabled
                                type="text"
                            />
                        </div>
                    </form>
                </div>

                <hr />
                <div className="py-2">
                    <div className="py-2">
                        <span className="text-lg font-bold">Location</span>
                    </div>
                    {quotation_product.map((p: any, i: number) => {
                        return (
                            <div className="py-4" key={i}>
                                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6">
                                    <div className="flex justify-center">
                                        <img
                                            src={p.url}
                                            alt=""
                                            className="max-w-[300px] object-contain"
                                        />
                                    </div>
                                    <div>
                                        <div className="py-2">
                                            <Link
                                                href={route(
                                                    'location.view',
                                                    p.location.id,
                                                )}
                                            >
                                                <span className="italic">
                                                    {p.location.product_name}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row items-center gap-2">
                                                <MapPin size={16} color="red" />
                                                <small className="line-clamp-1 md:line-clamp-3">
                                                    {p.location.location}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 py-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <UsersRound size={16} />
                                                <span className="text-sm">
                                                    {p.location.age_group}
                                                </span>
                                            </div>
                                            {p.location.duration ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Hourglass size={16} />
                                                    <span className="text-sm">
                                                        {secondsToHms(
                                                            p.location.duration,
                                                        )}
                                                    </span>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="py-2">
                                            <span className="line-clamp-3 text-justify">
                                                {renderHTML(
                                                    p.location
                                                        .product_description,
                                                )}
                                            </span>
                                        </div>

                                        <div className="flex flex-col justify-end py-2">
                                            {p.price.map((i: any) => {
                                                return (
                                                    <span
                                                        className="text-right font-bold"
                                                        key={i.product_price_id}
                                                    >
                                                        ({i.attribute}){' '}
                                                        {formattedNumber(
                                                            i.unit_price,
                                                        )}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="py-2">
                        <div className="flex justify-end">
                            <span className="text-lg font-bold">
                                {formattedNumber(productTotal)}
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="py-2">
                    <div className="py-2">
                        <span className="text-lg font-bold">
                            Additional Options
                        </span>
                    </div>
                    <div className="py-2">
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span>Transportation</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="py-2">
                                        <span className="text-justify">
                                            Price inclusive of bus rental (44
                                            pax / bus) and round trip from your
                                            school address to selected
                                            destinations
                                        </span>
                                        <br />
                                    </div>
                                    {quotation_item
                                        .filter((i: any) => {
                                            return (
                                                i.item_type === 'TRANSPORTATION'
                                            );
                                        })
                                        .map((i: ProposalItem) => {
                                            return (
                                                <div
                                                    key={i.item_id}
                                                    className="py-2"
                                                >
                                                    <div className="flex flex-col px-2 md:flex-row md:justify-between">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Checkbox
                                                                name="transportation"
                                                                defaultChecked
                                                                disabled
                                                            />
                                                            <div className="flex">
                                                                <span className="text-lg font-bold">
                                                                    {
                                                                        i.item_name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row justify-end gap-2">
                                                            <div className="flex items-center">
                                                                <span>
                                                                    (
                                                                    {i.item_qty}{' '}
                                                                    X{' '}
                                                                    {formattedNumber(
                                                                        parseFloat(
                                                                            i.unit_price,
                                                                        ),
                                                                    )}{' '}
                                                                    / {i.uom})
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-bold">
                                                                {formattedNumber(
                                                                    i.item_qty *
                                                                        parseFloat(
                                                                            i.unit_price,
                                                                        ),
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Meals</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <span>Please choose (optional)</span>
                                    </div>
                                    {quotation_item
                                        .filter((i: any) => {
                                            return i.item_type === 'FOOD';
                                        })
                                        .map((i: any) => {
                                            return (
                                                <div
                                                    key={i.item_id}
                                                    className="py-2"
                                                >
                                                    <div className="flex flex-col px-2 md:flex-row md:justify-between">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Checkbox
                                                                name="meals"
                                                                defaultChecked
                                                                disabled
                                                            />
                                                            <div className="flex">
                                                                <span className="text-lg font-bold">
                                                                    {
                                                                        i.item_name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row justify-end gap-2">
                                                            <div className="flex items-center">
                                                                <span>
                                                                    (
                                                                    {i.item_qty}{' '}
                                                                    X RM{' '}
                                                                    {
                                                                        i.unit_price
                                                                    }{' '}
                                                                    / {i.uom})
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-bold">
                                                                {formattedNumber(
                                                                    i.item_qty *
                                                                        i.unit_price,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Insurance</AccordionTrigger>
                                <AccordionContent>
                                    {quotation_item
                                        .filter((i: any) => {
                                            return i.item_type === 'INSURANCE';
                                        })
                                        .map((i: any) => {
                                            return (
                                                <div
                                                    key={i.item_id}
                                                    className="py-2"
                                                >
                                                    <div className="flex flex-col px-2 md:flex-row md:justify-between">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Checkbox
                                                                name="insurance"
                                                                defaultChecked
                                                                disabled
                                                            />
                                                            <div className="flex">
                                                                <span className="text-lg font-bold">
                                                                    {
                                                                        i.item_name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row justify-end gap-2">
                                                            <div className="flex items-center">
                                                                <span>
                                                                    (
                                                                    {i.item_qty}{' '}
                                                                    X RM{' '}
                                                                    {
                                                                        i.unit_price
                                                                    }{' '}
                                                                    / {i.uom})
                                                                </span>
                                                            </div>
                                                            <span className="text-lg font-bold">
                                                                {formattedNumber(
                                                                    i.item_qty *
                                                                        i.unit_price,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex justify-end gap-4 py-2">
                    <span className="text-lg font-bold">Sub Total</span>
                    <span className="text-lg font-bold">
                        {formattedNumber(productTotal + optionTotal)}
                    </span>
                </div>
                <div className="py-2">
                    <div>
                        {fees?.map((f: Fees) => {
                            return (
                                <div
                                    className="py flex flex-row justify-end gap-4"
                                    key={f.fee_id}
                                >
                                    <span className="text-lg font-bold">
                                        {f.fee_description}{' '}
                                        {f.fee_type === 'P'
                                            ? '(' +
                                              parseInt(f.fee_amount) +
                                              '%)'
                                            : ''}
                                    </span>
                                    <span className="text-lg font-bold">
                                        {formattedNumber(feeTotal)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-row justify-end gap-4 py-2">
                        <span className="text-lg font-bold text-red-800">
                            Discount
                        </span>
                        <span className="text-lg font-bold text-red-800">
                            -{' '}
                            {discountTotal
                                ? formattedNumber(discountTotal)
                                : 'RM 0.00'}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="py-4">
                    <div className="flex justify-end">
                        <span className="text-lg font-bold">
                            Total: {formattedNumber(total)}
                        </span>
                    </div>
                    {/* <div className="flex justify-end">
                        <span>
                            {proposal.proposal_status < 2 ? 'estimated ' : ''}
                            price per pax{' '}
                            {formattedNumber(total / proposal.qty_student)}
                        </span>
                    </div> */}
                </div>

                <div className="flex justify-end py-4">
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="primary"
                                disabled={
                                    quotation.quotation_status === 1
                                        ? false
                                        : true
                                }
                            >
                                Accept Quotation
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    Confirm to accept quotation? Once confirmed,
                                    an invoice will be generated.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e) => handleAcceptQuotation(e)}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </UserLayout>
    );
};

export default Quotation;
