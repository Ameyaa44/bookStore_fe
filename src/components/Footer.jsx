import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 md:gap-9 bg-[#1B4332] text-[#F5F1E8] p-10'>

        <div>
          <h4 className='font-bold text-[#E9C46A]'>ABOUT US</h4>
          <p className='text-justify mt-5 text-[#EAE0D5]'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae saepe incidunt ex dolores rerum illum optio, expedita
            accusamus autem perferendis velit adipisci, itaque aut distinctio deserunt quibusdam deleniti! Non, repudiandae!
          </p>
        </div>

        <div>
          <h4 className='font-bold text-[#E9C46A]'>NEWSLETTER</h4>
          <p className='my-5 text-[#EAE0D5]'>Stay updated with our latest trends</p>

          <div className='flex'>
            <input
              type="text"
              placeholder='Email ID'
              className='p-2 placeholder-[#6C584C] bg-[#FFFDF7] text-black'
            />
            <button className='bg-[#A4161A] py-3 px-3 text-white hover:bg-[#7F1D1D] transition'>
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div>
          <h4 className='font-bold text-[#E9C46A]'>FOLLOW US</h4>
          <p className='my-5 text-[#EAE0D5]'>Let us be social</p>

          <div className="flex gap-3 text-[#F5F1E8] text-xl">
            <FaInstagram className='hover:text-[#E9C46A] cursor-pointer' />
            <FaXTwitter className='hover:text-[#E9C46A] cursor-pointer' />
            <FaFacebook className='hover:text-[#E9C46A] cursor-pointer' />
            <FaLinkedin className='hover:text-[#E9C46A] cursor-pointer' />
          </div>
        </div>

      </div>

      <div className='bg-[#0B1F14] p-2 text-center text-[#EAE0D5] text-xs'>
        Copyright &copy; 2026 Allrights | This Website is made by Ameya
      </div>
    </>
  )
}

export default Footer