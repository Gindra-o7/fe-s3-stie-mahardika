import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const PaymentCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"success" | "pending" | "error">("pending");

    useEffect(() => {
        const statusCode = searchParams.get("status_code");
        const transactionStatus = searchParams.get("transaction_status");

        if (statusCode === "200" && transactionStatus === "settlement") {
            setStatus("success");
        } else if (statusCode === "201" && transactionStatus === "pending") {
            setStatus("pending");
        } else {
            setStatus("error");
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
            >
                {status === "success" && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-100 rounded-full">
                                <CheckCircle className="w-16 h-16 text-green-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                        <p className="text-gray-600 mb-8">
                            Thank you for your payment. Your registration has been processed successfully.
                            Please check your email for login credentials.
                        </p>
                    </>
                )}

                {status === "pending" && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-yellow-100 rounded-full">
                                <Clock className="w-16 h-16 text-yellow-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Pending</h1>
                        <p className="text-gray-600 mb-8">
                            Your payment is currently being processed. Please complete the payment if you haven't already.
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-red-100 rounded-full">
                                <XCircle className="w-16 h-16 text-red-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
                        <p className="text-gray-600 mb-8">
                            We couldn't process your payment. Please try again or contact support if the issue persists.
                        </p>
                    </>
                )}

                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-[#207D96] text-white py-3 rounded-xl font-semibold hover:bg-[#1B3F6E] transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </motion.div>
        </div>
    );
};

export default PaymentCallbackPage;
