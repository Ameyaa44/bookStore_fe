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

      <div className="min-h-[80vh] bg-[#FAF7F2] px-5 py-16 md:px-32">
        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif-display font-bold text-[#0D2818]">
              Contact Us
            </h1>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
            <p className="text-sm text-[#0D2818]/70 mt-6 max-w-xl mx-auto font-light leading-7">
              We'd love to hear from you. Whether it's a question about a rare edition, a membership inquiry, or just a warm note — our team is always ready to assist.
            </p>
          </div>

          {/* CONTACT INFO CARDS */}
          <div className="flex flex-col md:flex-row justify-center gap-5 mt-12">

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E3DAC9]/60 shadow-sm hover:shadow-md transition duration-300 flex-1">
              <span className="p-3.5 bg-[#0D2818] text-[#C5A880] rounded-xl text-lg">
                <FaLocationDot />
              </span>
              <div>
                <p className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Address</p>
                <span className="text-sm text-[#0D2818]/80 font-light">
                  128 Main Street, Apt 62,<br />Anytown, CA 87045
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E3DAC9]/60 shadow-sm hover:shadow-md transition duration-300 flex-1">
              <span className="p-3.5 bg-[#0D2818] text-[#C5A880] rounded-xl text-lg">
                <FaPhoneAlt />
              </span>
              <div>
                <p className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Phone</p>
                <span className="text-sm text-[#0D2818]/80 font-light">+91 987654321</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#E3DAC9]/60 shadow-sm hover:shadow-md transition duration-300 flex-1">
              <span className="p-3.5 bg-[#0D2818] text-[#C5A880] rounded-xl text-lg">
                <FaEnvelope />
              </span>
              <div>
                <p className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1">Email</p>
                <span className="text-sm text-[#0D2818]/80 font-light">bookstore@gmail.com</span>
              </div>
            </div>

          </div>

          {/* FORM + MAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-8">

            {/* FORM */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E3DAC9]/60">

              <h2 className="text-center font-serif-display text-2xl font-bold text-[#0D2818] mb-6">
                Send a Message
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Email</label>
                  <input
                    type="text"
                    className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
                    placeholder="yourname@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Message</label>
                  <textarea
                    className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
                    rows={5}
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button className="w-full bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] py-3.5 flex justify-center items-center gap-2 rounded-xl transition-all duration-300 font-semibold text-xs uppercase tracking-[2px] border border-[#C5A880]/20 hover:border-transparent shadow-sm">
                  Send Message <IoIosSend className="text-lg" />
                </button>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-[#E3DAC9]/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0329716078363!2d75.78374199999999!3d11.258984799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65900d568d853%3A0x86dc9f15ee869de3!2sLuminar%20Technolab%20-%20Software%20Training%20Institute%20in%20Calicut!5e0!3m2!1sen!2sin!4v1771478148718!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: "420px", border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;