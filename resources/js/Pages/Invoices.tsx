import UserLayout from "@/layout/UserLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Table from "@/components/table/Table";
import Pagination from "@/components/pagination";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { usePage } from "@inertiajs/react";

const Invoices = ({ invoices }: any) => {
    const { data, links } = usePage<{}>().props;

    return (
        <UserLayout>
            <div className="px-8 py-4">
                <div>
                    <div>Invoices</div>
                </div>
                <div className="py-4">
                    {/* <Tabs defaultValue="new" className="">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="new">Unpaid</TabsTrigger>
                            <TabsTrigger value="paid">History</TabsTrigger>
                        </TabsList>
                        <div className="py-2">
                            <TabsContent value="new">
                                Unpaid Invoices
                            </TabsContent>
                            <TabsContent value="paid">
                                Invoice History List
                            </TabsContent>
                        </div>
                    </Tabs> */}
                    <Table
                        columns={[
                            {
                                label: "Invoice No.",
                                name: "invoiceNo",
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.product_name}</>
                                        {row.deleted_at && (
                                            <Trash2
                                                size={16}
                                                className="ml-2 text-gray-400"
                                            />
                                        )}
                                    </>
                                ),
                            },

                            {
                                label: "Invoice Date",
                                name: "date",

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {moment(row.created).format(
                                                "DD/MM/YYYY HH:mm"
                                            )}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: "Amount (RM)",
                                name: "amount",

                                renderCell: (row) => (
                                    <>
                                        <>{row.amount}</>
                                    </>
                                ),
                            },
                            {
                                label: "Status",
                                name: "status",
                                renderCell: (row) => (
                                    <>
                                        <>{row.status}</>
                                    </>
                                ),
                            },
                        ]}
                        rows={data}
                        getRowDetailsUrl={(row) =>
                            route("product.view", row.id)
                        }
                    />
                    <Pagination links={links} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Invoices;
