import Loading from '@/components/loading';
import crypto from 'crypto-js';
import { useEffect, useRef, useState } from 'react';

const ProcessPayment = ({ orderNo, orderAmount }: any) => {
    const paymentForm = useRef<HTMLFormElement>(null);
    const paymentId = 'HEROES' + new Date().getTime();
    const [total, setTotal] = useState(orderAmount);
    const [orderId, setOrderId] = useState(orderNo);

    useEffect(() => {
        if (paymentForm.current !== null) {
            paymentForm.current.submit();
        }
    }, []);
    const generateHash = () => {
        const plain_text =
            import.meta.env.VITE_EGHL_MERCHANTPASS +
            import.meta.env.VITE_EGHL_MERCHANTID +
            paymentId +
            import.meta.env.VITE_EGHL_CALLBACKURL +
            import.meta.env.VITE_EGHL_CALLBACKURL +
            total +
            'MYR';
        return crypto.SHA256(plain_text).toString();
    };
    const [hashValue] = useState(generateHash());

    return (
        <div>
            <Loading />
            <span className="flex items-center justify-center text-2xl font-bold">
                Please wait while we process your payment
            </span>

            <form
                name="paymentForm"
                ref={paymentForm}
                action={import.meta.env.VITE_EGHL_SITE}
            >
                <input type="hidden" name="TransactionType" value="SALE" />
                <input type="hidden" name="PymtMethod" value="ANY" />
                <input
                    type="hidden"
                    name="ServiceID"
                    value={import.meta.env.VITE_EGHL_MERCHANTID}
                />
                <input type="hidden" name="PaymentID" value={paymentId} />
                <input type="hidden" name="OrderNumber" value={orderId} />
                <input
                    type="hidden"
                    name="PaymentDesc"
                    value="Purchase of Heroes Activity"
                />
                <input type="hidden" name="MerchantName" value="Heroes" />
                <input
                    type="hidden"
                    name="MerchantReturnURL"
                    value={import.meta.env.VITE_EGHL_CALLBACKURL}
                />
                <input
                    type="hidden"
                    name="MerchantCallbackURL"
                    value={import.meta.env.VITE_EGHL_CALLBACKURL}
                />
                <input type="hidden" name="Amount" value={total} />
                <input type="hidden" name="CurrencyCode" value="MYR" />
                <input type="hidden" name="CustName" value="" />
                <input type="hidden" name="CustEmail" value="" />
                <input type="hidden" name="CustPhone" value="" />
                <input type="hidden" name="HashValue" value={hashValue} />
                <input type="hidden" name="LanguageCode" value="en" />
            </form>
        </div>
    );
};

export default ProcessPayment;
