import Pagination from '@/components/pagination';
import Table from '@/components/table/Table';
import UserLayout from '@/layout/UserLayout';
import { formattedNumber } from '@/util/formatNumber';
import moment from 'moment';

const Orders = ({ orders }: { orders: any }) => {
    const { data, links } = orders;

    return (
        <UserLayout>
            <div className="px-8 py-4 md:px-20 lg:px-40">
                <div className="flex justify-between">
                    <div className="py-4">
                        <span className="text-lg font-bold">Orders</span>
                    </div>
                    {/* <History /> */}
                </div>
                <div className="py-4">
                    <Table
                        columns={[
                            {
                                label: 'Order No.',
                                name: 'order_no',
                                renderCell: (row: any) => (
                                    <>
                                        <>{row.order_no}</>
                                    </>
                                ),
                            },
                            {
                                label: 'Order Date',
                                name: 'order_date',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {row.order_date
                                                ? moment(row.order_date).format(
                                                      'DD/MM/YYYY',
                                                  )
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
                                            {row.order_amount
                                                ? formattedNumber(
                                                      row.order_amount,
                                                  )
                                                : ''}
                                        </>
                                    </>
                                ),
                            },
                            {
                                label: 'Due Date',
                                name: 'due_date',

                                renderCell: (row) => (
                                    <>
                                        <>
                                            {row.due_date
                                                ? moment(row.due_date).format(
                                                      'DD/MM/YYYY',
                                                  )
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
                                            {row.order_status === 0
                                                ? 'Pending Payment'
                                                : row.order_status === 1
                                                  ? 'Pending Payment'
                                                  : row.order_status === 2
                                                    ? 'Payment Made'
                                                    : row.order_status === 3
                                                      ? 'Cancelled'
                                                      : 'Payment Failed'}
                                        </small>
                                    </>
                                ),
                            },
                        ]}
                        rows={data}
                        getRowDetailsUrl={(row) =>
                            route('order.view', row.order_id)
                        }
                    />
                    <Pagination links={links} />
                </div>
            </div>
        </UserLayout>
    );
};

export default Orders;
