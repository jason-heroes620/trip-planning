import { useState, useEffect } from "react";
import UserLayout from "@/layout/UserLayout";
import QuotationTable from "@/components/table/quotation";
import { History } from "lucide-react";
import Loading from "@/components/loading";
import { router } from "@inertiajs/react";

const Quotations = () => {
    return (
        <UserLayout>
            <div className="px-8 py-4">
                <div className="flex justify-between">
                    <div>
                        <div>Quotations</div>
                    </div>
                    <History />
                </div>
                <div className="py-2">
                    <QuotationTable />
                </div>
            </div>
        </UserLayout>
    );
};

export default Quotations;
