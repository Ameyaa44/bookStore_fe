import React from "react";
import Header from "../components/Header";
import Footer from "../../components/Footer";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

function Contact() {
  return (
    <>
      <Header />

      <div className="min-h-[60vh] bg-[#F8F5F0] px-5 py-10 md:px-40">

        {/* TITLE */}
        <h1 className="text-4xl text-center font-bold text-[#1B4332]">
          Contact Us
        </h1>

        <p className="text-justify my-6 text-gray-700 leading-7">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
          expedita deleniti debitis explicabo accusantium minus fuga vel.
          Fuga officiis rem expedita quam sequi natus optio, voluptas soluta
          quis obcaecati.
        </p>

        {/* CONTACT INFO */}
        <div className="flex flex-col md:flex-row justify-around gap-6 mt-16">

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow border border-[#e8e3db]">
            <span className="p-3 bg-[#1B4332] text-white rounded-full">
              <FaLocationDot />
            </span>
            <span className="text-gray-700">
              128 Main Street, Apt 62,
              <br />
              Anytown, CA 87045
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow border border-[#e8e3db]">
            <span className="p-3 bg-[#1B4332] text-white rounded-full">
              <FaPhoneAlt />
            </span>
            <span className="text-gray-700">+91 987654321</span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow border border-[#e8e3db]">
            <span className="p-3 bg-[#1B4332] text-white rounded-full">
              <FaEnvelope />
            </span>
            <span className="text-gray-700">bookstore@gmail.com</span>
          </div>

        </div>

        {/* FORM + MAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-8">

          {/* FORM */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-[#e8e3db]">

            <h1 className="text-center text-2xl font-bold text-[#1B4332]">
              Send Message
            </h1>

            <input
              type="text"
              className="w-full mt-5 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332]"
              placeholder="Name"
            />

            <input
              type="text"
              className="w-full mt-4 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332]"
              placeholder="Email ID"
            />

            <textarea
              className="w-full mt-4 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1B4332]"
              rows={5}
              placeholder="Message"
            ></textarea>

            <button className="bg-[#1B4332] hover:bg-[#143126] text-white py-3 w-full flex justify-center items-center gap-2 mt-5 rounded-xl transition">
              Send <IoIosSend className="text-xl" />
            </button>

          </div>

          {/* MAP */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#e8e3db]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0329716078363!2d75.78374199999999!3d11.258984799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65900d568d853%3A0x86dc9f15ee869de3!2sLuminar%20Technolab%20-%20Software%20Training%20Institute%20in%20Calicut!5e0!3m2!1sen!2sin!4v1771478148718!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ minHeight: "426px", border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;