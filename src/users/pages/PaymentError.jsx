import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function PaymentSuccess() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-red-50 ">
      
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[400px] text-center gap-3">
        
        {/* Close Button */}
        <Link to={'/'} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <IoClose size={'30px'} />
        </Link>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
            <img src="https://cdn.dribbble.com/userupload/42295887/file/original-2e27796737e975dc1e453c3b72df2a3d.gif" width={'800px'} height={'800px'} alt="" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Payment Failed
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2">
          Your payment has been failed.
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