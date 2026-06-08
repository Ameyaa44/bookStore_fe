import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function PaymentSuccess() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-green-100 ">
      
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[400px] text-center gap-3">
        
        {/* Close Button */}
        <Link to={'/'} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <IoClose size={'30px'} />
        </Link>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
            <img src="https://cdn.dribbble.com/userupload/23792735/file/original-17b2b7b1f13e997e74325f1209a5894a.gif" width={'800px'} height={'800px'} alt="" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Payment Successful 🎉
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2">
          Your payment has been successfully processed.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to={'/books'} className="w-full bg-blue-500 text-white py-2.5 rounded-lg transition shadow-md">
           Explore more...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;