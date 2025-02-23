import Pagination from '@/components/pagination';
import Table from '@/components/table/Table';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import moment from 'moment';

const Quotations = ({ quotations }: any) => {
    const { data, links } = quotations;

    return (
        <UserLayout>
            <div className="px-8 py-4 md:px-20 lg:px-40">
                <div className="flex justify-between">
                    <div className="py-4">
                        <span className="text-lg font-bold">Quotations</span>
                    </div>
                    {/* <History /> */}
                </div>
                <div className="py-4">
                    <Table
                        columns={[
                            {
                                label: 'Quotation No.',
                                name: 'quotation_no',
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.quotation_no}</>
                                    </>
                                ),
                            },
                            {
                                label: 'Quotation Date',
                                name: 'quotation_date',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {row.quotation_date
                                                ? moment(
                                                      row.quotation_date,
                                                  ).format('DD/MM/YYYY')
                                                : ''}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: 'Proposal Name',
                                name: 'proposal_name',
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.proposal_name}</>
                                    </>
                                ),
                            },
                            {
                                label: 'Amount (RM)',
                                name: 'amount',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {row.amount
                                                ? formattedNumber(row.amount)
                                                : ''}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: 'Status',
                                name: 'status',
                                renderCell: (row) => (
                                    <>
                                        <small>
                                            {row.quotation_status === 0
                                                ? 'In Process'
                                                : row.quotation_status === 1
                                                  ? 'Ready For Review'
                                                  : row.quotation_status === 2
                                                    ? 'Quotation Accepted'
                                                    : row.quotation_status === 3
                                                      ? 'Order Issued'
                                                      : ''}
                                        </small>
                                    </>
                                ),
                            },
                        ]}
                        rows={data}
                        getRowDetailsUrl={(row) =>
                            route('quotation.view', row.quotation_id)
                        }
                    />
                    <Pagination links={links} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Quotations;
