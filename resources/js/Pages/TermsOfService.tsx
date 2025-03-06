import UserLayout from '@/layout/UserLayout';
import { useEffect, useRef } from 'react';
import TOSPage from './TOSPage';

const TermsOfService = () => {
    const scrolledRef = useRef(false);

    useEffect(() => {});

    return (
        <UserLayout>
            <div className="container mx-auto pt-4" id="content">
                <div className="flex flex-col px-4 py-4">
                    <div className="flex justify-center py-4">
                        <p className="text-center text-3xl font-semibold tracking-wide">
                            Terms of Service
                        </p>
                    </div>
                    <div className="px-4 py-4 md:px-16 lg:px-32 xl:px-64">
                        <TOSPage />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default TermsOfService;
