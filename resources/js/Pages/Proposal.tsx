import AccordionProposalItem from '@/components/AccordionItem';
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
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import UserLayout from '@/layout/UserLayout';
import { cn } from '@/lib/utils';
import { ProposalItem } from '@/types';
import { formattedNumber } from '@/util/formatNumber';
import { renderHTML } from '@/util/renderHtml';
import { secondsToHms } from '@/util/secondsToHms';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { CalendarIcon, Hourglass, MapPin, UsersRound } from 'lucide-react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

const ProposalView = ({
    auth,
    flash,
    proposal,
    proposal_product,
    product_prices,
    items,
    proposal_item,
    proposal_fees,
}: any) => {
    const { toast } = useToast();
    const { props } = usePage();
    const previousUrl = props.previousUrl || '/';

    const { data, setData } = useForm({
        proposal_id: proposal.proposal_id,
        proposal_name: proposal.proposal_name,
        proposal_date: proposal.proposal_date,
        quotation_id: proposal.quotation_id,
        additional_price: proposal.additional_price,
        qty_student: proposal.qty_student,
        qty_teacher: proposal.qty_teacher,
        proposal_status: proposal.proposal_status,
    });

    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY, // Replace with your API key
        libraries: libraries as any,
    });

    const [travelInfo, setTravelInfo] = useState({
        travelDuration:
            proposal.travel_duration !== 0 ? proposal.travel_duration : 0,
        travelDistance:
            proposal.travel_distance > 0 ? proposal.travel_distance : 0,
    });

    const calculateDistances = async (locations: []) => {
        const service = new google.maps.DirectionsService();

        const origin = proposal.origin; // Replace with your origin
        const destinations = proposal.origin; // Replace with your destinations
        const waypoints = locations; // Replace with your destinations

        await service.route(
            {
                origin: origin,
                destination: destinations,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC, // Use METRIC for kilometers
            },
            (response, status) => {
                if (status === 'OK') {
                    let distance = response?.routes[0].legs.reduce(
                        (sum, leg) => sum + (leg.distance?.value ?? 0),
                        0,
                    );
                    let duration = response?.routes[0].legs.reduce(
                        (sum, leg) => sum + (leg.duration?.value ?? 0),
                        0,
                    );

                    setTravelInfo({
                        travelDistance: distance,
                        travelDuration: duration,
                    });
                    const data = {
                        distance: distance,
                        duration: duration,
                    };
                    axios.patch(
                        route('proposal.travel_info', proposal.proposal_id),
                        data,
                    );
                } else {
                    console.error('Error with Distance Matrix API:', status);
                }
            },
        );
    };

    const [open, setOpen] = useState(false);
    const [openRequestQuotation, setOpenRequestQuotation] = useState(false);

    const [date, setDate] = useState<Date | undefined>(
        data.proposal_date ? data.proposal_date : '',
    );

    const [transportationItem, setTransportationItem] = useState(
        items.filter((i: any) => i.item_type === 'TRANSPORTATION'),
    );
    const [mealsItem, setMealsItem] = useState(
        items.filter((i: any) => i.item_type === 'FOOD'),
    );
    const [insuranceItem, setInsuranceItem] = useState(
        items.filter((i: any) => i.item_type === 'INSURANCE'),
    );

    const [proposalItems, setProposalItems] = useState(proposal_item);
    const calculateTrasportionFormula = proposal_item?.some(
        (p: any) => p.item_type === 'TRANSPORTATION',
    )
        ? false
        : true;
    const [locations, setLocations] = useState([]);

    const handleProposalItemChanged = (
        e: React.ChangeEvent<HTMLInputElement>,
        m: ProposalItem,
    ) => {
        let newItem = proposalItems;
        const item = {
            item_id: m.item_id,
            unit_price: m.unit_price,
            uom: m.uom,
            item_qty: m.item_type === 'TRANSPORTATION' ? 1 : data.qty_student,
            type: m.item_type,
            sales_tax: m.sales_tax,
            additional_unit_cost: m.additional_unit_cost,
            additional: m.additional,
            distance: travelInfo.travelDistance,
        };
        if (proposalItems.length > 0) {
            if (newItem.find((n: ProposalItem) => n.item_id === m.item_id)) {
                newItem = proposalItems.filter((n: ProposalItem) => {
                    return n.item_id !== m.item_id;
                });
                setProposalItems(newItem);
                calculateTotal(newItem, data.qty_student, data.qty_teacher);
            } else {
                setProposalItems([...newItem, item]);
                calculateTotal(
                    [...newItem, item],
                    data.qty_student,
                    data.qty_teacher,
                );
            }
            console.log('item => ', item);
        } else {
            setProposalItems([item]);
            calculateTotal([item], data.qty_student, data.qty_teacher);
        }
    };

    const handleItemQtyChange = (item_id: string, formula: string) => {
        let item = [];
        if (formula === 'add') {
            item = proposalItems.map((i: ProposalItem) => {
                if (i.item_id === item_id) {
                    return { ...i, item_qty: i.item_qty + 1 };
                } else {
                    return i;
                }
            });
        } else {
            item = proposalItems.map((i: ProposalItem) => {
                if (i.item_id === item_id)
                    return {
                        ...i,
                        item_qty: i.item_qty - 1 > 0 ? i.item_qty - 1 : 1,
                    };
                else {
                    return i;
                }
            });
        }
        setProposalItems(item);
        calculateTotal(item, data.qty_student, data.qty_teacher);
    };

    const handleQtyChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        attribute: string,
        qty: number,
    ) => {
        e.preventDefault();
        let child = 0;
        let adult = 0;

        child = attribute === 'child' ? parseInt(e.target.value) : qty;
        adult = attribute === 'adult' ? parseInt(e.target.value) : qty;
        setData('qty_student', child);
        setData('qty_teacher', adult);

        calculateTotal(proposalItems, child, adult);
    };

    const [productTotal, setProductTotal] = useState(0);
    const [optionTotal, setOptionTotal] = useState(0);
    const [feeTotal, setFeeTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const calculateTotal = (i: any, child: number, adult: number) => {
        let product = product_prices.reduce(
            (sum: number, p: any) =>
                p.attribute === 'child'
                    ? sum + child * parseFloat(p.unit_price)
                    : sum + adult * parseFloat(p.unit_price),
            0.0,
        );

        let option = i.reduce(
            (sum: number, p: any) =>
                sum +
                (p.item_type === 'TRANSPORTATION' && calculateTrasportionFormula
                    ? parseFloat(p.item_qty) *
                      (parseFloat(p.unit_price) +
                          parseFloat(p.additional_unit_cost) *
                              Math.round(travelInfo.travelDistance / 1000))
                    : parseFloat(p.item_qty) * parseFloat(p.unit_price)),
            0.0,
        );

        let fee = proposal_fees.reduce(
            (sum: number, p: any) =>
                sum +
                (p.fee_type === 'P'
                    ? ((product + option) * p.fee_amount) / 100
                    : p.fee_amount),
            0.0,
        );

        let t =
            product +
            option +
            fee -
            (proposal.discount_type ? proposal.discount_amount : 0);

        setProductTotal(product);
        setOptionTotal(option);
        setFeeTotal(fee);
        setTotal(t);
    };

    useEffect(() => {
        let travelLocations = proposal_product.map((p: any) => {
            return { location: p.location.location, stopover: true };
        });

        setLocations(travelLocations);

        if (proposal.travel_duration === 0 || proposal.travel_distance === 0) {
            calculateDistances(travelLocations);
        }
        let child = product_prices.find((p: any) => {
            return p.attribute === 'child';
        });

        let adult = product_prices.find((p: any) => {
            return p.attribute === 'adult';
        });
        calculateTotal(proposal_item, child.qty, adult.qty);
    }, [travelInfo.travelDistance]);

    const handleSubmitDraft = (e: any) => {
        e.preventDefault();
        setOpen(false);
        const draft = {
            proposal_id: data.proposal_id,
            proposal_name: data.proposal_name,
            proposal_date: data.proposal_date,
            additional_price: data.additional_price,
            qty_student: data.qty_student,
            qty_teacher: data.qty_teacher,
            proposal_items: proposalItems,
        };
        axios.post(route('proposal.update'), draft).then((resp) => {
            if (resp.data.success) {
                toast({
                    description: resp.data.success,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: resp.data.failed + '!',
                    description:
                        'There was an issue with update. Please check your information and try again',
                });
            }
        });
    };

    const handleRequestQuotation = (e: any) => {
        e.preventDefault();
        setOpenRequestQuotation(false);
        axios
            .post(route('quotation.create'), {
                proposal_id: proposal.proposal_id,
                subTotal: productTotal + optionTotal,
                total: total,
            })
            .then((resp) => {
                if (resp.data.success) {
                    toast({
                        description: resp.data.success,
                    });
                    setData('proposal_status', 1);
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Quotation request error!',
                        description: resp.data.failed,
                    });
                }
            });
    };

    if (!isLoaded) return <div>Loading...</div>;

    const handleDownloadProposal = () => {
        axios
            .get(route('proposal.pdf', proposal.proposal_id), {
                responseType: 'blob',
            })
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: 'application/pdf',
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url); // Opens in a new tab
            })
            .catch((err) => {});
    };

    return (
        <UserLayout>
            <div className="px-4 py-4 md:px-10 lg:px-20 xl:px-40">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-6">
                        <div className="py-4">
                            <Button
                                variant={'destructive'}
                                onClick={() =>
                                    router.visit(previousUrl.toString())
                                }
                            >
                                Back
                            </Button>
                        </div>
                        <span className="text-lg font-bold">Proposal</span>
                    </div>
                    <div className="flex">
                        {proposal.proposal_status === 3 && (
                            <Button
                                variant={'primary'}
                                onClick={() => handleDownloadProposal()}
                            >
                                Download Proposal
                            </Button>
                        )}
                    </div>
                </div>

                <div className="py-2 pb-6">
                    <form className="flex flex-col gap-4 md:grid md:grid-cols-2">
                        <div>
                            <InputLabel>Proposal Name</InputLabel>
                            <TextInput
                                id="proposal_name"
                                name="proposal_name"
                                value={data.proposal_name}
                                className="mt-1 block w-full"
                                autoComplete="proposal_name"
                                onChange={(e) =>
                                    setData('proposal_name', e.target.value)
                                }
                                maxLength={200}
                                required
                            />
                        </div>
                        <div>
                            <div className="flex flex-row">
                                <InputLabel>
                                    Proposed Visitation Date
                                </InputLabel>
                                <span className="text-red-500"> *</span>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild className="mt-1">
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-full justify-start text-left font-normal',
                                            !date && 'text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date ? (
                                            moment(date).format('DD/MM/YYYY')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        fromDate={moment()
                                            .add(10, 'days')
                                            .toDate()}
                                        onSelect={(date) => {
                                            setDate(date);
                                            setData(
                                                'proposal_date',
                                                date?.toLocaleDateString(),
                                            );
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <InputLabel>No. of Students</InputLabel>
                            <TextInput
                                id="qty_student"
                                name="qty_student"
                                value={data.qty_student}
                                className="mt-1 block w-full"
                                autoComplete="qty_student"
                                onChange={(e) => {
                                    handleQtyChange(
                                        e,
                                        'child',
                                        data.qty_teacher,
                                    );
                                }}
                                maxLength={4}
                                type="number"
                            />
                        </div>
                        <div>
                            <InputLabel>No. of Teachers</InputLabel>
                            <TextInput
                                id="qty_teacher"
                                name="qty_teacher"
                                value={data.qty_teacher}
                                className="mt-1 block w-full"
                                autoComplete="qty_teacher"
                                onChange={(e) => {
                                    handleQtyChange(
                                        e,
                                        'adult',
                                        data.qty_student,
                                    );
                                }}
                                maxLength={4}
                                type="number"
                            />
                        </div>
                        {/* <div className="py-2">
                            <PrimaryButton className="" disabled={processing}>
                                Update
                            </PrimaryButton>
                        </div> */}
                    </form>
                </div>
                <hr />
                <div className="py-2">
                    <div className="py-2">
                        <span className="text-lg font-bold">Location</span>
                    </div>
                    {proposal_product.map((p: any, i: number) => {
                        return (
                            <div className="py-4 md:px-10 lg:px-20" key={i}>
                                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6">
                                    <div className="flex justify-center">
                                        <img
                                            src={p.url}
                                            alt=""
                                            className="max-w-[300px] object-contain"
                                        />
                                    </div>
                                    <div className="px-4">
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
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <MapPin
                                                    size={16}
                                                    color={'red'}
                                                />
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

                                        <div className="flex flex-col py-2">
                                            <div className="flex flex-row justify-end">
                                                <span className="text-left font-bold">
                                                    (child ){' '}
                                                    {formattedNumber(
                                                        p.location.child_price,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-end">
                                                <span className="text-left font-bold">
                                                    (adult){' '}
                                                    {formattedNumber(
                                                        p.location.adult_price,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex flex-col py-4">
                        <span className="font-bold">
                            Estimated Travel Distance (Round Trip):{' '}
                            {Math.round(travelInfo.travelDistance / 1000)} KM
                        </span>
                        <span className="font-bold">
                            Estimated Travel Duration:{' '}
                            {secondsToHms(travelInfo.travelDuration)}
                        </span>
                    </div>
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
                            Add on (optional)
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
                                        <span>
                                            * This is only estimation. The final
                                            transportation cost will be provided
                                            in quotation.
                                        </span>
                                    </div>
                                    <AccordionProposalItem
                                        productItems={transportationItem}
                                        proposalItems={proposalItems}
                                        handleProposalItemChanged={
                                            handleProposalItemChanged
                                        }
                                        handleItemQtyChange={
                                            handleItemQtyChange
                                        }
                                        distance={travelInfo.travelDistance}
                                        proposalStatus={data.proposal_status}
                                        calculate={calculateTrasportionFormula}
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Meals</AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <span>Please choose (optional)</span>
                                    </div>
                                    <AccordionProposalItem
                                        productItems={mealsItem}
                                        proposalItems={proposalItems}
                                        handleProposalItemChanged={
                                            handleProposalItemChanged
                                        }
                                        handleItemQtyChange={
                                            handleItemQtyChange
                                        }
                                        distance={0}
                                        proposalStatus={data.proposal_status}
                                        calculate={false}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Insurance</AccordionTrigger>
                                <AccordionContent>
                                    <AccordionProposalItem
                                        productItems={insuranceItem}
                                        proposalItems={proposalItems}
                                        handleProposalItemChanged={
                                            handleProposalItemChanged
                                        }
                                        handleItemQtyChange={
                                            handleItemQtyChange
                                        }
                                        distance={0}
                                        proposalStatus={data.proposal_status}
                                        calculate={false}
                                    />
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
                <div className="flex justify-end">
                    {proposal_fees?.map((f: any) => {
                        return (
                            <div className="flex gap-4" key={f.fee_id}>
                                <span className="text-lg font-bold">
                                    {f.fee_description} (
                                    {parseInt(f.fee_amount)}%)
                                </span>
                                <span className="text-lg font-bold">
                                    {f.fee_type === 'P'
                                        ? formattedNumber(
                                              ((productTotal + optionTotal) *
                                                  f.fee_amount) /
                                                  100,
                                          )
                                        : formattedNumber(f.fee_amount)}
                                </span>
                            </div>
                        );
                    })}
                </div>
                {proposal.discount_type && (
                    <>
                        <div className="py-2">
                            {/* <div>
                                <span className="text-lg font-bold">
                                    Discount
                                </span>
                            </div> */}

                            {proposal.discount_type === 'F' ? (
                                <div className="flex justify-end gap-4">
                                    <span className="text-lg font-bold text-red-800">
                                        Discount
                                    </span>
                                    <span className="text-lg font-bold text-red-800">
                                        -{' '}
                                        {formattedNumber(
                                            proposal.discount_amount,
                                        )}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-end gap-4">
                                    <span>
                                        {' '}
                                        Discount ({proposal.discount_percentage}
                                        %)
                                    </span>
                                    <span className="text-lg font-bold text-red-800">
                                        {'  '}-{' '}
                                        {formattedNumber(
                                            proposal.discount_amount,
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>

                        <hr />
                    </>
                )}

                <div className="py-4">
                    <div className="flex justify-end">
                        <span className="text-lg font-bold">
                            Total{'  '}
                            {formattedNumber(total)}
                        </span>
                    </div>
                    {/* <div className="flex justify-end">
                        <span>
                            {proposal.proposal_status < 2 ? 'estimated ' : ''}
                            price per pax{' '}
                            {formattedNumber(total / data.qty_student)}
                        </span>
                    </div> */}
                </div>

                <div className="flex justify-end gap-2 py-2">
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="default"
                                disabled={
                                    data.proposal_status === 0 ? false : true
                                }
                            >
                                Save Changes
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    Confirm to save changes?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e) => handleSubmitDraft(e)}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog
                        open={openRequestQuotation}
                        onOpenChange={setOpenRequestQuotation}
                    >
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={
                                    data.proposal_status < 1 &&
                                    data.proposal_date
                                        ? false
                                        : true
                                }
                            >
                                Request Quotation
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    Confirm to request for a quotation? Once
                                    confirmed, you will not be able to make any
                                    changes to the proposal.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e) => handleRequestQuotation(e)}
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

export default ProposalView;
