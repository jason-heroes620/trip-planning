import AccordionProposalItem from '@/components/AccordionItem';
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
import { Calendar } from '@/components/ui/calendar';
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
import useDisabledDates from '@/util/useDisabledDates';
import useDisabledDays from '@/util/useDisabledDays';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { isSameDay } from 'date-fns';
import {
    CalendarIcon,
    Hourglass,
    MapPin,
    Trash2,
    UsersRound,
    Utensils,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

const mapKey = import.meta.env.VITE_GOOGLE_KEY;
const libraries = ['places'];

const ProposalView = ({
    auth,
    flash,
    proposal,
    proposal_product,
    product_prices,
    items,
    proposal_item,
    proposal_fees,
    proposal_endDate,
}: any) => {
    const { toast } = useToast();
    const { props } = usePage();
    const previousUrl = props.previousUrl || '/';

    const { data, setData, errors, processing } = useForm({
        proposal_id: proposal.proposal_id,
        proposal_name: proposal.proposal_name,
        proposal_date: proposal.proposal_date,
        quotation_id: proposal.quotation_id,
        additional_price: proposal.additional_price,
        qty_student: proposal.qty_student,
        qty_teacher: proposal.qty_teacher,
        proposal_status: proposal.proposal_status,
        special_request: proposal.special_request,
        markup_per_student: proposal.markup_per_student,
        proposal_file: proposal.proposal_file,
    });

    const [proposalFile, setProposalFile] = useState<File>(
        proposal.proposal_file,
    );
    const products = proposal_product.map((p: any) => {
        return p.product_id;
    });

    const { disabledDays } = useDisabledDays(proposal.proposal_id);
    const { disabledDates } = useDisabledDates(proposal.proposal_id, products);

    const libraries = useMemo(() => ['places'], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapKey, // Replace with your API key
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
    const [openRequestOrder, setOpenRequestOrder] = useState(false);

    const [date, setDate] = useState<Date | undefined>(
        data.proposal_date ? moment(data.proposal_date).toDate() : undefined,
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

    const [guideItem, setGuideItem] = useState(
        items.filter(
            (i: any) =>
                i.item_type === 'GUIDE' &&
                proposal_product.some(
                    (p: any) => p.product_id === i.product_id,
                ),
        ),
    );

    const [proposalItems, setProposalItems] = useState(proposal_item);
    const calculateTrasportationFormula = proposalItems?.some(
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
            item_qty:
                m.item_type === 'TRANSPORTATION' || m.item_type === 'GUIDE'
                    ? 1
                    : data.qty_student,
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
        let student = 0;
        let teacher = 0;

        if (attribute === 'student') {
            setData('qty_student', parseInt(e.target.value));
            student = parseInt(e.target.value);
            teacher = data.qty_teacher;
        } else {
            setData('qty_teacher', parseInt(e.target.value));
            teacher = parseInt(e.target.value);
            student = data.qty_student;
        }

        calculateTotal(proposalItems, student, teacher);
    };

    const [productTotal, setProductTotal] = useState(0);
    const [optionTotal, setOptionTotal] = useState(0);
    const [feeTotal, setFeeTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [markupPerStudent, setMarkupPerStudent] = useState(
        data.markup_per_student ?? 0,
    );
    const [includeStudentCost, setIncludeStudentCost] = useState(true);

    const calculateTotal = (i: any, student: number, teacher: number) => {
        let product = product_prices.reduce(
            (sum: number, p: any) =>
                p.attribute === 'student'
                    ? sum + student * parseFloat(p.unit_price)
                    : sum + teacher * parseFloat(p.unit_price),
            0.0,
        );

        let option = i.reduce(
            (sum: number, p: any) =>
                sum +
                (p.item_type === 'TRANSPORTATION' &&
                calculateTrasportationFormula
                    ? parseFloat(p.item_qty) *
                      (parseFloat(p.unit_price) +
                          parseFloat(p.additional_unit_cost) *
                              Math.round(travelInfo.travelDistance / 1000))
                    : parseFloat(p.item_qty) * parseFloat(p.unit_price)),
            0.0,
        );
        let fee: number = proposal_fees.reduce(
            (sum: number, p: any) =>
                sum +
                (p.fee_type === 'P'
                    ? ((product + option) * parseFloat(p.fee_amount)) / 100
                    : parseFloat(p.fee_amount)),
            0.0,
        );

        let discount: number = proposal.discount_type
            ? proposal.discount_amount
            : 0;
        let t = product + option + fee - discount;
        setProductTotal(product);
        setOptionTotal(option);
        setFeeTotal(fee);
        setTotal(t);
    };

    useEffect(() => {
        let travelLocations = proposal_product.map((p: any) => {
            return { location: p.location.google_location, stopover: true };
        });
        setLocations(travelLocations);

        if (proposal.travel_duration === 0 || proposal.travel_distance === 0) {
            if (isLoaded) {
                calculateDistances(travelLocations);
            }
        }

        calculateTotal(proposal_item, data.qty_student, data.qty_teacher);
    }, [travelInfo.travelDistance, isLoaded]);

    const checkMinAndMaxQty = async () => {
        let qualify = true;
        proposal_product.map((p: any) => {
            if (
                p.location.min_quantity > data.qty_student ||
                p.location.max_quantity < data.qty_student
            )
                qualify = false;
        });
        if (!qualify) {
            toast({
                variant: 'destructive',
                title: 'Min / Max pax limit!',
                description:
                    'There is a min & max pax limit to your location and you might not have meet the requirements. ',
            });
        }
    };

    const handleSaveDraft = async (e: any) => {
        e.preventDefault();
        await checkMinAndMaxQty();
        const draft = {
            proposal_id: data.proposal_id,
            proposal_name: data.proposal_name,
            proposal_date: data.proposal_date,
            additional_price: data.additional_price,
            qty_student: data.qty_student,
            qty_teacher: data.qty_teacher,
            proposal_items: proposalItems,
            special_request: data.special_request,
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
            setOpen(false);
        });
    };

    const handleRequestOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const draft = {
            proposal_id: data.proposal_id,
            proposal_name: data.proposal_name,
            proposal_date: data.proposal_date,
            additional_price: data.additional_price,
            qty_student: data.qty_student,
            qty_teacher: data.qty_teacher,
            proposal_items: proposalItems,
            special_request: data.special_request,
            proposal_status: 2,
        };
        axios.post(route('proposal.update'), draft).then((resp) => {
            if (resp.data.success) {
                setData('proposal_status', 2);
                toast({
                    description: resp.data.request_order,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: resp.data.failed + '!',
                    description:
                        'There was an issue with your request. Please save your changes before requesting.',
                });
            }
            setOpenRequestOrder(false);
        });
    };

    if (!isLoaded) return <div>Loading...</div>;

    const handleDownloadProposal = () => {
        axios
            .get(route('proposal.pdf', proposal.proposal_id), {
                params: {
                    include_student_cost: includeStudentCost,
                },
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

    const handleSaveMarkupPerStudent = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        e.preventDefault();
        axios
            .put(route('proposal.markup', proposal.proposal_id), {
                markup_per_student: markupPerStudent,
            })
            .then((resp) => {
                if (resp.status === 200) {
                    toast({
                        description: 'Update has been applied to proposal',
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        description:
                            'There was an error updating your proposal.',
                    });
                }
            });
    };

    const isDateDisabled = (dateToCheck: Date) => {
        const dayOfWeek = moment(dateToCheck).day();
        if (disabledDays.includes(dayOfWeek)) {
            return true;
        }

        return disabledDates.some((disabledDate: Date) =>
            isSameDay(dateToCheck, disabledDate),
        );
    };

    const handleDeleteLocation = (locationId: number) => {
        axios
            .delete(route('proposal_location.delete', proposal.proposal_id), {
                params: {
                    location_id: locationId,
                },
            })
            .then((resp) => {
                if (resp.status === 200) {
                    window.location.reload();
                }
            });
    };

    const handleMainFileUpload = (e: any) => {
        const files: File = e.target.files[0];
        var canUpload = true;
        files.size > 2097152 ? (canUpload = false) : '';
        if (canUpload) {
            setProposalFile(files);
            // setData('proposal_file', e.target.files[0]);
        } else {
            alert('1 or more files exceed the upload limit.');
        }
    };

    const handleUpload = (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('proposal_file', proposalFile);
        formData.append('proposal_id', proposal.proposal_id);
        axios
            .post(route('proposal_file.upload'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((resp) => {
                if (resp.status === 200) {
                    setData('proposal_file', proposalFile);
                    toast({
                        description: 'File has been uploaded',
                    });
                } else {
                    toast({
                        variant: 'destructive',
                        description: 'There was an error uploading your file.',
                    });
                }
            });
    };

    return (
        <UserLayout>
            <div className="px-4 py-4 md:px-10 lg:px-20 xl:px-32">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-6">
                        <div className="py-4">
                            <Button
                                variant={'destructive'}
                                onClick={
                                    () => router.visit(route('proposal.index'))
                                    // router.visit(previousUrl.toString())
                                }
                            >
                                Back
                            </Button>
                        </div>
                        <span className="text-lg font-bold">Proposal</span>
                    </div>
                    <div className="flex">
                        {proposal.proposal_status === 3 && (
                            // <Button
                            //     variant={'primary'}
                            //     onClick={() => handleDownloadProposal()}
                            // >
                            //     Download Proposal
                            // </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="primary">
                                        Donwload Proposal
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Download Proposal
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="flex items-center gap-2">
                                            <Checkbox
                                                checked={includeStudentCost}
                                                onChange={() =>
                                                    setIncludeStudentCost(
                                                        !includeStudentCost,
                                                    )
                                                }
                                            />
                                            <label htmlFor="">
                                                Include student cost.
                                            </label>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                handleDownloadProposal();
                                            }}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
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
                                disabled={
                                    proposal.proposal_status > 1 ? true : false
                                }
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
                                        disabled={
                                            proposal.proposal_status > 1
                                                ? true
                                                : false
                                        }
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
                                        toDate={proposal_endDate}
                                        onSelect={(date) => {
                                            setDate(date);
                                            setData(
                                                'proposal_date',
                                                moment(date).format(
                                                    'YYYY-MM-DD',
                                                ),
                                            );
                                        }}
                                        disabled={isDateDisabled}
                                        defaultMonth={date}
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
                                        'student',
                                        data.qty_student,
                                    );
                                }}
                                min={1}
                                maxLength={4}
                                type="number"
                                disabled={
                                    proposal.proposal_status > 1 ? true : false
                                }
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
                                        'teacher',
                                        data.qty_teacher,
                                    );
                                }}
                                min={1}
                                maxLength={4}
                                type="number"
                                disabled={
                                    proposal.proposal_status > 1 ? true : false
                                }
                            />
                        </div>
                        {/* <div className="py-2">
                            <PrimaryButton className="" disabled={processing}>
                                Update
                            </PrimaryButton>
                        </div> */}
                        {proposal.proposal_status === 3 && (
                            <div>
                                <InputLabel>
                                    Markup Per Student (optional)
                                </InputLabel>
                                <div className="flex flex-row items-center gap-4">
                                    <TextInput
                                        id="additional_cost"
                                        name="additional_cost"
                                        defaultValue={data.markup_per_student}
                                        className="mt-1 block w-full"
                                        autoComplete="additional_cost"
                                        onChange={(e) =>
                                            setMarkupPerStudent(e.target.value)
                                        }
                                        maxLength={4}
                                        type="number"
                                    />
                                    <div>
                                        <Button
                                            variant="primary"
                                            onClick={(e: any) =>
                                                handleSaveMarkupPerStudent(e)
                                            }
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                <div className="flex justify-end"></div>
                                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6">
                                    <div className="flex justify-center">
                                        <img
                                            src={p.url}
                                            alt=""
                                            className="max-w-[300px] object-contain"
                                        />
                                    </div>
                                    <div className="px-4">
                                        <div className="flex justify-between gap-4 py-2">
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
                                            <div>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Trash2
                                                            size={20}
                                                            color="red"
                                                            className="hover:cursor-pointer"
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-h-screen max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle></DialogTitle>
                                                            <DialogDescription>
                                                                Confirm to
                                                                delete this
                                                                location from
                                                                proposal?
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <DialogFooter className="justify-end">
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button
                                                                    type="button"
                                                                    variant="secondary"
                                                                >
                                                                    Close
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDeleteLocation(
                                                                        p
                                                                            .location
                                                                            .id,
                                                                    )
                                                                }
                                                            >
                                                                Confirm
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
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
                                                <UsersRound
                                                    size={16}
                                                    color="red"
                                                />
                                                <span className="text-sm">
                                                    {p.location.age_group}
                                                </span>
                                            </div>
                                            {p.location.duration ? (
                                                <div className="flex flex-row items-center gap-2">
                                                    <Hourglass
                                                        size={16}
                                                        color="red"
                                                    />
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
                                        <div className="py grid grid-cols-2">
                                            <div className="flex flex-row items-center gap-2">
                                                <Utensils
                                                    size={16}
                                                    color="red"
                                                />
                                                <span className="text-sm">
                                                    {p.location.food_allowed ===
                                                    0
                                                        ? 'Allowed'
                                                        : 'Not Allowed'}
                                                </span>
                                            </div>

                                            <div className="flex flex-row items-center gap-2">
                                                <span className="text-sm text-red-500">
                                                    Min/Max
                                                </span>
                                                <span className="text-sm">
                                                    {p.location.min_quantity}/
                                                    {p.location.max_quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <span className="line-clamp-3 text-justify">
                                                {renderHTML(
                                                    p.location
                                                        .product_description,
                                                )}
                                            </span>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="link">
                                                        Show More..
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-h-screen max-w-[425px] overflow-y-scroll md:max-w-[620px]">
                                                    <DialogHeader>
                                                        <DialogTitle></DialogTitle>
                                                        <DialogDescription></DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <span className="font-bold underline">
                                                            Description
                                                        </span>
                                                        <div className="ulDescription py-2 text-justify">
                                                            {renderHTML(
                                                                p.location
                                                                    .product_description,
                                                            )}
                                                        </div>
                                                        <div className="pt-4">
                                                            <span className="font-bold underline">
                                                                Activities
                                                            </span>
                                                        </div>
                                                        <div className="ulDescription py-2 text-justify">
                                                            {renderHTML(
                                                                p.location
                                                                    .product_activities,
                                                            )}
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="justify-end">
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

                                        <div className="flex flex-col py-2">
                                            <div className="flex flex-row justify-end">
                                                <span className="text-left font-bold">
                                                    (student){' '}
                                                    {/* {formattedNumber(
                                                        p.location
                                                            .student_price,
                                                    )} */}
                                                    {formattedNumber(
                                                        product_prices.filter(
                                                            (price: any) => {
                                                                return (
                                                                    price.product_id ===
                                                                        p
                                                                            .location
                                                                            .id &&
                                                                    price.attribute ===
                                                                        'student'
                                                                );
                                                            },
                                                        )[0].unit_price,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex flex-row justify-end">
                                                <span className="text-left font-bold">
                                                    (teacher){' '}
                                                    {formattedNumber(
                                                        product_prices.filter(
                                                            (price: any) => {
                                                                return (
                                                                    price.product_id ===
                                                                        p
                                                                            .location
                                                                            .id &&
                                                                    price.attribute ===
                                                                        'teacher'
                                                                );
                                                            },
                                                        )[0].unit_price,
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
                                            Price inclusive of bus rental and
                                            round trip from your school address
                                            to selected destinations
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
                                        calculate={
                                            calculateTrasportationFormula
                                        }
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
                            {guideItem.length > 0 && (
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>Guide</AccordionTrigger>
                                    <AccordionContent>
                                        <AccordionProposalItem
                                            productItems={guideItem}
                                            proposalItems={proposalItems}
                                            handleProposalItemChanged={
                                                handleProposalItemChanged
                                            }
                                            handleItemQtyChange={
                                                handleItemQtyChange
                                            }
                                            distance={0}
                                            proposalStatus={
                                                data.proposal_status
                                            }
                                            calculate={false}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                        </Accordion>
                    </div>
                </div>

                <div className="py-4 pb-8">
                    <span className="font-bold">Special Request</span>
                    <textarea
                        id="special_request"
                        name="special_request"
                        value={data.special_request ?? ''}
                        className="mt-1 block w-full border-1 px-2 py-2"
                        onChange={(e) => {
                            setData('special_request', e.target.value);
                        }}
                        rows={4}
                        disabled={proposal.proposal_status > 1 ? true : false}
                    />
                </div>
                <div className="py-4">
                    <div>
                        <div className="flex flex-col gap-2">
                            <InputLabel>
                                Official School Letter (if applicable)
                            </InputLabel>
                            <div className="flex flex-row border px-2 py-2 md:w-1/2">
                                <input
                                    type="file"
                                    multiple={false}
                                    accept=".pdf"
                                    onChange={(e) => {
                                        handleMainFileUpload(e);
                                    }}
                                />
                                <Button onClick={(e) => handleUpload(e)}>
                                    Upload
                                </Button>
                            </div>
                        </div>
                        <small>(supported formats .pdf more than 2 MB)</small>
                    </div>
                    <div>
                        {data.proposal_file && (
                            <div className="flex h-12 w-12 items-center justify-center px-2">
                                <img
                                    src={'/img/PDF_file_icon.svg.png'}
                                    className="w-12 cursor-pointer object-contain"
                                    onClick={() => {
                                        window.open(
                                            `${route('proposal_file.download', {
                                                id: proposal.proposal_id,
                                            })}`,
                                            '_blank',
                                        );
                                    }}
                                    alt="pdf"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <span className="text-sm">
                        * All orders are subject to 10% or RM80 administration
                        fee whichever is higher.
                    </span>
                </div>
                <hr />
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
                                    {f.fee_description}
                                    {f.fee_type === 'P'
                                        ? `(
                                    ${parseInt(f.fee_amount)}%)`
                                        : ''}
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
                                    <span className="text-lg font-bold text-red-600">
                                        Discount
                                    </span>
                                    <span className="text-lg font-bold text-red-600">
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
                                    <span className="text-lg font-bold text-red-600">
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
                </div>
                {proposal.proposal_status === 3 && (
                    <div>
                        <span>Costing Per Student: </span>
                        <span className="font-bold">
                            {formattedNumber(
                                Math.ceil(
                                    (total +
                                        markupPerStudent *
                                            proposal.qty_student) /
                                        proposal.qty_student,
                                ),
                            )}
                        </span>
                    </div>
                )}

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
                                    onClick={(e) => handleSaveDraft(e)}
                                    disabled={processing}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog
                        open={openRequestOrder}
                        onOpenChange={setOpenRequestOrder}
                    >
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="primary"
                                disabled={
                                    data.proposal_status < 1 &&
                                    data.proposal_date
                                        ? false
                                        : true
                                }
                            >
                                Request Order
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    Confirm to request order? Once confirmed,
                                    you will not be able to make any changes to
                                    the proposal.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(e: any) => handleRequestOrder(e)}
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
