import Pagination from '@/components/pagination';
import Table from '@/components/table/Table';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import { Trash2 } from 'lucide-react';
import moment from 'moment';

// Status
// 0 Draft
// 1 Cancelled
// 2 Pending Quotation
// 3 Ready For Review
// 4 Quotation Accepted

const Proposals = ({ proposals }: any) => {
    const { data, links } = proposals;

    return (
        <UserLayout>
            <div className="px-8 py-4 md:px-20 lg:px-40">
                <div className="py-4">
                    <span className="text-lg font-bold">Proposals</span>
                </div>
                <div className="py-4">
                    <Table
                        columns={[
                            {
                                label: 'Proposal Name',
                                name: 'proposalName',
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.proposal_name}</>
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
                                label: 'Proposed Visitation Date',
                                name: 'proposal_date',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {row.proposal_date
                                                ? moment(
                                                      row.proposal_date,
                                                  ).format('DD/MM/YYYY')
                                                : ''}
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
                                        <>
                                            {row.proposal_status === 0
                                                ? 'Draft'
                                                : row.proposal_status === 2
                                                  ? 'Pending Quotation'
                                                  : row.proposal_status === 3
                                                    ? 'Ready For Review'
                                                    : 'Archived'}
                                        </>
                                    </>
                                ),
                            },
                        ]}
                        rows={data}
                        getRowDetailsUrl={(row) =>
                            route('proposal.view', row.proposal_id)
                        }
                    />
                    <Pagination links={links} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Proposals;
