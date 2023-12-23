/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

export default function SuccessMessage(/*{OTP, sendOTP, count, otpError, requestOTP, handleChange, isLoading}*/{userData}){

        return(
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md">
                    <p className="text-green-600 text-lg font-semibold mb-4">
                        Email validation successful. <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Login</Link> to your account.
                    </p>
                </div>
            </div>
        );
    
}