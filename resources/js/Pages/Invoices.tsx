import Pagination from '@/components/pagination';
import Table from '@/components/table/Table';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import { Trash2 } from 'lucide-react';
import moment from 'moment';

const Invoices = ({ invoices }: any) => {
    const { data, links } = invoices;

    return (
        <UserLayout>
            <div className="px-8 py-4 md:px-20 lg:px-40">
                <div className="py-4">
                    <span className="text-lg font-bold">Invoices</span>
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
                                label: 'Invoice No.',
                                name: 'invoiceNo',
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.invoice_no}</>
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
                                label: 'Invoice Date',
                                name: 'date',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {moment(row.created).format(
                                                'DD/MM/YYYY',
                                            )}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: 'Amount (RM)',
                                name: 'amount',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {formattedNumber(
                                                row.invoice_amount,
                                            )}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: 'Status',
                                name: 'status',
                                renderCell: (row) => (
                                    <>
                                        <span className="text-sm">
                                            {row.invoice_status === 0
                                                ? 'PAID'
                                                : row.invoice_status === 1
                                                  ? 'UNPAID'
                                                  : 'CANCELLED'}
                                        </span>
                                    </>
                                ),
                            },
                        ]}
                        rows={data}
                        getRowDetailsUrl={(row) =>
                            route('invoice.view', row.invoice_id)
                        }
                    />
                    <Pagination links={links} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Invoices;
