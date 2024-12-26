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
import axios from 'axios';
import { useEffect, useState } from 'react';

const Proposal = () => {
    const [proposalCount, setProposalCount] = useState(0);

    useEffect(() => {}, []);

    const handleCheck = () => {
        axios.get(route('proposal.check')).then((res) => {
            console.log('res -> ', res.data);
            if (res.data.length > 0) {
                setProposalCount(res.data.length);
                setMessage(messages[1]);
            } else {
            }
        });
    };

    const messages = [
        'You do not have any existing proposal, would you like to create one?',
        `You have ${proposalCount} proposal(s), would you like to add to existing proposal or create a new proposal?`,
    ];
    const [message, setMessage] = useState(messages[0]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => handleCheck()}>
                    Add To Proposal
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4"></div>
                <DialogFooter>
                    {proposalCount > 0 ? (
                        <div>
                            <Button type="submit" variant={'destructive'}>
                                Existing Proposal
                            </Button>
                            <Button type="submit">Create New Proposal</Button>
                        </div>
                    ) : (
                        <Button type="submit">Create New Proposal</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Proposal;
