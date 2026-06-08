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
      <div className="min-h-[60vh] bg-[#F8F5F0] px-4 py-10 md:px-10">

        {/* BOOK CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-7 md:grid grid-cols-4 gap-8 border border-[#e8e3db]">

          {/* IMAGE */}
          <div className="col-span-1">
            <img
              src={bookData?.image}
              alt="book"
              className="w-full h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            />
          </div>

          {/* DETAILS */}
          <div className="col-span-3">

            {/* TITLE */}
            <h1 className="text-center font-bold text-3xl text-[#1B4332]">
              {bookData?.title}
            </h1>

            {/* AUTHOR */}
            <p className="text-center text-[#BC6C25] text-lg font-medium mt-1">
              {bookData?.author}
            </p>

            {/* VIEW ICON */}
            <div className="flex justify-end mt-3">
              <button
                className="text-xl text-[#1B4332] hover:text-[#BC6C25] transition"
                onClick={() => setModalStatus(true)}
              >
                <FaEye />
              </button>
            </div>

            {/* INFO GRID */}
            <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                Publisher : {bookData?.publisher}
              </span>

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                Language : {bookData?.language}
              </span>

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                Pages : {bookData?.noOfPages}
              </span>

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                Seller : {bookData?.userMail}
              </span>

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                Price : ₹{bookData?.price}
              </span>

              <span className="font-semibold bg-[#F8F5F0] p-3 rounded-xl text-[#1B4332]">
                ISBN : {bookData?.isbn}
              </span>
            </div>

            {/* ABSTRACT */}
            <p className="my-6 text-justify leading-8 text-gray-700">
              {bookData?.abstract}
            </p>

            {/* BUTTONS */}
            <div className="flex md:justify-end justify-center gap-5">

              <Link to={"/books"}>
                <button className="flex gap-2 bg-[#1B4332] items-center px-5 py-3 rounded-xl text-white hover:bg-[#143126] transition">
                  <FaAnglesLeft /> Back
                </button>
              </Link>

              <button
                onClick={handlePayment}
                className="bg-[#BC6C25] text-white px-6 py-3 rounded-xl hover:bg-[#a85d1f] transition shadow-md"
              >
                Buy ₹{bookData?.discountPrice}
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {modalStatus && (
          <div
            className="relative z-10"
            onClick={() => setModalStatus(false)}
          >
            <div className="bg-black/70 fixed inset-0 backdrop-blur-sm flex justify-center items-center">

              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                style={{ height: "500px", width: "900px" }}
                onClick={(e) => e.stopPropagation()}
              >

                {/* HEADER */}
                <div className="bg-[#1B4332] text-white flex justify-between items-center p-4">
                  <h1 className="text-lg">Book Images</h1>

                  <button onClick={() => setModalStatus(false)}>
                    <IoClose />
                  </button>
                </div>

                {/* TITLE */}
                <h2 className="text-lg text-[#BC6C25] flex gap-3 items-center m-4 font-medium">
                  <FaCamera />
                  Camera click of the book in the hand of seller
                </h2>

                {/* IMAGES */}
                <div className="flex gap-5 overflow-x-auto p-4">
                  {bookData?.uploadImg?.length > 0 ? (
                    bookData.uploadImg.map((item, index) => (
                      <img
                        key={index}
                        src={`${base_url}/uploadImg/${item}`}
                        alt="book"
                        className="w-[300px] rounded-2xl shadow-lg"
                      />
                    ))
                  ) : (
                    <h2 className="text-red-500 text-xl">
                      No Images
                    </h2>
                  )}
                </div>
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