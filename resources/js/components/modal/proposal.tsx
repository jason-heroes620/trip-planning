import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputError from '../InputError';
import SelectInput from '../SelectInput';
import { Input } from '../ui/input';

const Proposal = ({ product }: any) => {
    const { toast } = useToast();

    const [proposalCount, setProposalCount] = useState(0);
    const [proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState('');
    const [proposalName, setProposalName] = useState('');
    const [inputError, setInputError] = useState('');
    const [selectError, setSelectError] = useState('');

    const [mainModalOpen, setMainModalOpen] = useState(false);
    const [selectProposalModalOpen, setSelectProposalnModalOpen] =
        useState(false);
    const [createProposalModalOpen, setcreateProposalModalOpen] =
        useState(false);

    const handleCheck = () => {
        axios.get(route('proposal.check')).then((res) => {
            if (res.data.proposal.length > 0) {
                setProposalCount(res.data.proposal.length);
                setProposals(res.data.proposal);
                setMessage(messages[1]);
            } else {
            }
        });
    };

    useEffect(() => {
        handleCheck();
    }, [proposalCount]);

    const messages = [
        'You do not have any existing proposal, would you like to create one?',
        `You have ${proposalCount} proposal(s), would you like to add to existing proposal or create a new proposal?`,
    ];

    const handleSelectProposal = (e: any) => {
        e.preventDefault();
        const data = {
            proposal_id: selectedProposal,
            product_id: product.id,
            product_price: product.price,
        };

        axios.post(route('proposalProduct.add'), data).then((resp) => {
            if (resp.data.success) {
                setSelectProposalnModalOpen(false);
                setMainModalOpen(false);
                toast({
                    title: '',
                    description: 'Product added to your proposal',
                });
                setSelectError('');
            } else {
                setSelectError(resp.data.error);
            }
        });
    };

    const selectProposal = () => {
        return (
            <Dialog
                open={selectProposalModalOpen}
                onOpenChange={() =>
                    setSelectProposalnModalOpen(!selectProposalModalOpen)
                }
            >
                <DialogTrigger asChild>
                    <Button type="submit" variant={'default'}>
                        Existing Proposal
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose Your Proposal</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <SelectInput
                            options={proposals}
                            onChange={(e) =>
                                setSelectedProposal(e.target.value)
                            }
                        />
                        {selectError && <InputError message={selectError} />}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSelectProposal}>Select</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    const handleCreateProposal = (e: any) => {
        e.preventDefault();

        if (proposalName.length > 0) {
            try {
                axios
                    .post(route('proposal.create'), {
                        proposal_name: proposalName,
                        product_id: product.id,
                        product_price: product.price,
                    })
                    .then((resp) => {
                        if (resp.data.success) {
                            //dialog
                            setcreateProposalModalOpen(false);
                            setMainModalOpen(false);
                            toast({
                                title: '',
                                description: 'New Proposal Created',
                            });
                        } else {
                            // error dialog
                            setInputError(resp.data.error);
                        }
                        setProposalCount(resp.data.length);
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Proposal name should not be empty');
        }
    };

    const createProposal = () => {
        return (
            <Dialog
                open={createProposalModalOpen}
                onOpenChange={() =>
                    setcreateProposalModalOpen(!createProposalModalOpen)
                }
            >
                <DialogTrigger asChild>
                    <Button type="submit" variant={'ghost'}>
                        Create New Proposal
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Proposal</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="e.g. YourSchool_MonthYear"
                            onChange={(e) => setProposalName(e.target.value)}
                        ></Input>
                    </div>
                    {inputError && (
                        <InputError message={inputError} className="mt-2" />
                    )}
                    <DialogFooter>
                        <Button onClick={handleCreateProposal}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    const [message, setMessage] = useState(messages[0]);
    return (
        <Dialog
            open={mainModalOpen}
            onOpenChange={() => setMainModalOpen(!mainModalOpen)}
        >
            <DialogTrigger asChild>
                <Button variant="default">Add To Proposal</Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4"></div>
                <DialogFooter>
                    {proposalCount > 0 ? (
                        <div className="flex gap-6">
                            {selectProposal()}
                            {createProposal()}
                        </div>
                    ) : (
                        createProposal()
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Proposal;
