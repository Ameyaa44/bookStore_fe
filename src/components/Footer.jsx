import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className='bg-[#0A1C12] text-[#EAE0D5] border-t border-[#C5A880]/20 transition-all duration-300'>
        <div className='max-w-7xl mx-auto md:grid grid-cols-3 gap-12 p-12 md:py-20'>

          {/* COLUMN 1: ABOUT */}
          <div className="mb-10 md:mb-0">
            <h4 className='font-serif-display text-lg font-semibold uppercase tracking-[3px] text-[#C5A880] mb-6'>
              Our Story
            </h4>
            <p className='text-justify text-sm text-[#EAE0D5]/80 leading-7 font-light'>
              We are a curated sanctuary for book collectors, seekers of knowledge, and lovers of the written word. We believe that physical books hold souls, and every story you hold is an invitation to explore a new realm.
            </p>
          </div>

          {/* COLUMN 2: NEWSLETTER */}
          <div className="mb-10 md:mb-0">
            <h4 className='font-serif-display text-lg font-semibold uppercase tracking-[3px] text-[#C5A880] mb-6'>
              The Bulletin
            </h4>
            <p className='text-sm text-[#EAE0D5]/80 leading-7 font-light mb-6'>
              Subscribe to receive exclusive releases, literary thoughts, and member privileges.
            </p>

            <div className='flex overflow-hidden rounded-lg border border-[#C5A880]/30 focus-within:border-[#C5A880] transition-colors duration-300 max-w-sm'>
              <input
                type="text"
                placeholder='Email Address'
                className='flex-grow p-3.5 pl-4 placeholder-[#8C7A6B] bg-[#FAF7F2] text-[#0D2818] outline-none text-sm'
              />
              <button className='bg-[#C5A880] hover:bg-[#FAF7F2] text-[#0D2818] font-bold py-3.5 px-5 transition-all duration-300 flex items-center justify-center border-l border-[#C5A880]/30'>
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* COLUMN 3: SOCIALS & CONTACT */}
          <div>
            <h4 className='font-serif-display text-lg font-semibold uppercase tracking-[3px] text-[#C5A880] mb-6'>
              Keep in Touch
            </h4>
            <p className='text-sm text-[#EAE0D5]/80 leading-7 font-light mb-6'>
              Join our intellectual circle across social platforms.
            </p>

            <div className="flex gap-4 text-xl">
              <a href="" target="_blank" rel="noreferrer" className='hover:text-[#C5A880] hover:-translate-y-1 text-[#EAE0D5]/80 transition-all duration-300 p-2.5 bg-[#FAF7F2]/5 rounded-full border border-white/5 hover:border-[#C5A880]/30'>
                <FaInstagram />
              </a>
              <a href="" target="_blank" rel="noreferrer" className='hover:text-[#C5A880] hover:-translate-y-1 text-[#EAE0D5]/80 transition-all duration-300 p-2.5 bg-[#FAF7F2]/5 rounded-full border border-white/5 hover:border-[#C5A880]/30'>
                <FaXTwitter />
              </a>
              <a href="" target="_blank" rel="noreferrer" className='hover:text-[#C5A880] hover:-translate-y-1 text-[#EAE0D5]/80 transition-all duration-300 p-2.5 bg-[#FAF7F2]/5 rounded-full border border-white/5 hover:border-[#C5A880]/30'>
                <FaFacebook />
              </a>
              <a href="" target="_blank" rel="noreferrer" className='hover:text-[#C5A880] hover:-translate-y-1 text-[#EAE0D5]/80 transition-all duration-300 p-2.5 bg-[#FAF7F2]/5 rounded-full border border-white/5 hover:border-[#C5A880]/30'>
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className='bg-[#050D08] border-t border-[#C5A880]/10 py-3 text-center text-[#C5A880]/60 text-[10px] uppercase tracking-[2px] font-medium select-none'>
        Copyright &copy; 2026 All Rights Reserved | Developed using React & TailwindCSS 
      </div>
    </>
  )
}

export default Footer