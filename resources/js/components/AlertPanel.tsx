import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertPanel({ text }: { text: string }) {
    return (
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle></AlertTitle>
            <AlertDescription>{text}</AlertDescription>
        </Alert>
    );
}
