import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaAnglesLeft } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";

import Header from "../components/Header";
import Footer from "../../components/Footer";

import { getBookByIdApi, purchaseBookApi } from "../../services/allApis";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import base_url from "../../services/base_url";

function ViewBook() {
  const [modalStatus, setModalStatus] = useState(false);
  const [bookData, setBookData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getBookData();
    }
  }, []);

  const getBookData = async () => {
    const response = await getBookByIdApi(id);
    if (response?.status === 200) {
      setBookData(response?.data);
    }
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51TPEUHBs3RZpe2BeM4JLVIW6iljrLHo2mRR8tNPLpf4sJcliTeMY1srayYuw6rPUTgSW7VwUYEySif2abriy0m5X00DmFA7Jor"
    );

    const response = await purchaseBookApi(bookData);

    if (response.status === 200) {
      if (response.data.checkoutPaymentUrl) {
        window.location.href = response.data.checkoutPaymentUrl;
      } else {
        toast.warning("Payment Gateway Error");
      }
    } else {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <Header />

      {/* PAGE WRAPPER */}
      <div className="min-h-[80vh] bg-[#FAF7F2] px-6 py-12 md:px-12 transition-all duration-300">
        <div className="max-w-6xl mx-auto">

          {/* BOOK DETAIL CARD */}
          <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 md:grid grid-cols-4 gap-12 border border-[#E3DAC9]/60 relative">

            {/* IMAGE CONTAINER WITH SPINE SHADOW */}
            <div className="col-span-1 relative h-fit overflow-hidden rounded-2xl shadow-md border border-[#E3DAC9]/40 group">
              <img
                src={bookData?.image}
                alt="book"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition duration-500"
              />
              <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/25 to-transparent"></div>
            </div>

            {/* DETAILS */}
            <div className="col-span-3 flex flex-col justify-between mt-8 md:mt-0">

              <div>
                {/* HEADINGS */}
                <h1 className="font-serif-display font-bold text-3xl md:text-4xl text-[#0D2818] tracking-wide">
                  {bookData?.title}
                </h1>

                <p className="text-lg font-serif-sub italic text-[#C5A880] mt-2 font-medium">
                  by {bookData?.author}
                </p>

                {/* VIEW IMAGE TRIGGERS */}
                <div className="flex justify-end mt-2">
                  <button
                    className="flex items-center gap-2 text-sm text-[#C5A880] hover:text-[#0D2818] font-medium transition-colors duration-300 border border-[#C5A880]/20 hover:border-[#C5A880] px-4 py-2 rounded-full"
                    onClick={() => setModalStatus(true)}
                  >
                    <span>View Cover Files</span>
                    <FaEye />
                  </button>
                </div>

                {/* INFO GRID */}
                <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-5 text-sm">
                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Publisher</span>
                    <span className="font-medium text-[#0D2818] truncate">{bookData?.publisher}</span>
                  </div>

                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Language</span>
                    <span className="font-medium text-[#0D2818] capitalize">{bookData?.language}</span>
                  </div>

                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Total Pages</span>
                    <span className="font-medium text-[#0D2818]">{bookData?.noOfPages}</span>
                  </div>

                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Owner Contact</span>
                    <span className="font-medium text-[#0D2818] truncate">{bookData?.userMail}</span>
                  </div>

                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Original Price</span>
                    <span className="font-medium text-[#0D2818]">₹{bookData?.price}</span>
                  </div>

                  <div className="border border-[#E3DAC9]/50 p-4 rounded-2xl flex flex-col bg-[#FAF7F2]/50">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">ISBN Reference</span>
                    <span className="font-medium text-[#0D2818]">{bookData?.isbn}</span>
                  </div>
                </div>

                {/* ABSTRACT */}
                <div className="border-t border-[#FAF7F2] pt-6 mb-8">
                  <h3 className="text-xs uppercase tracking-[2px] font-semibold text-[#C5A880] mb-3">Abstract & Synopsis</h3>
                  <p className="text-justify text-sm leading-8 text-[#0D2818]/80 font-light">
                    {bookData?.abstract}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#E3DAC9]/40">
                <Link to={"/books"} className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#0D2818] text-[#C5A880] hover:bg-[#FAF7F2] hover:text-[#0D2818] hover:border-[#C5A880]/60 border border-transparent px-8 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[2px] transition duration-300">
                    <FaAnglesLeft size={10} /> Back
                  </button>
                </Link>

                <button
                  onClick={handlePayment}
                  className="w-full sm:w-auto bg-[#C5A880] text-[#0D2818] hover:bg-[#0D2818] hover:text-[#C5A880] border border-[#C5A880] px-10 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[2px] transition duration-300 shadow-md hover:shadow-lg"
                >
                  Buy Edition for ₹{bookData?.discountPrice}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* MODAL */}
        {modalStatus && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setModalStatus(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col border border-[#E3DAC9]/60"
              style={{ maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="bg-[#0D2818] text-white flex justify-between items-center px-6 py-5 border-b border-[#C5A880]/30">
                <h1 className="font-serif-display text-lg tracking-[1px] font-semibold text-[#C5A880]">Cover & In-Hand Verification</h1>
                <button onClick={() => setModalStatus(false)} className="text-[#C5A880] hover:text-white p-1 transition duration-200">
                  <IoClose size={24} />
                </button>
              </div>

              {/* DETAILS TITLE */}
              <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E3DAC9]/40 flex gap-3 items-center">
                <FaCamera className="text-[#C5A880] text-lg" />
                <span className="text-xs font-semibold text-[#0D2818] uppercase tracking-[1.5px]">Authenticity clicks uploaded by the seller</span>
              </div>

              {/* IMAGES */}
              <div className="flex gap-6 overflow-x-auto p-8 bg-white justify-center items-center">
                {bookData?.uploadImg?.length > 0 ? (
                  bookData.uploadImg.map((item, index) => (
                    <div key={index} className="relative rounded-2xl overflow-hidden border border-[#E3DAC9]/60 shadow-md flex-shrink-0 group">
                      <img
                        src={`${base_url}/uploadImg/${item}`}
                        alt="book verification"
                        className="h-[300px] w-auto object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center col-span-full">
                    <h2 className="text-red-500/80 font-light text-base uppercase tracking-[1.5px]">
                      No verification photos uploaded.
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ViewBook;