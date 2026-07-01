import React from 'react'
import { IoPower } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminHeader() {

  const navigate = useNavigate()

  const adminLogout = () => {
    sessionStorage.clear()
    navigate('/')
    toast.success("Logout Successfully")
  }

  return (
    <>
      <div className='w-full px-6 py-4 flex justify-between items-center bg-[#0D2818] border-b border-[#C5A880]/20'>
        
        <div className='flex items-center gap-3'>
          <img src="/logo.png" alt="" className='w-[38px] h-[38px] object-contain rounded-md' />
          <div>
            <span className='font-serif-display text-lg font-semibold text-white tracking-wide'>
              Book<span className="text-[#C5A880]">Store</span>
            </span>
            <p className="text-[9px] text-[#C5A880]/60 uppercase tracking-[2px] -mt-0.5">Admin Panel</p>
          </div>
        </div>

        <button
          onClick={adminLogout}
          className='flex items-center gap-2 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl px-4 py-2 transition-all duration-300 font-semibold text-xs uppercase tracking-[1px]'
        >
          <IoPower />
          Logout
        </button>

      </div>

      <div className='bg-[#C5A880]/10 border-b border-[#C5A880]/20 py-2 px-6 overflow-hidden'>
        <p className="text-[#C5A880] text-xs uppercase tracking-[2px] font-light whitespace-nowrap animate-marquee inline-block">
          ✦ &nbsp; Welcome, Admin — Monitor book listings, manage careers, and update system settings from this panel &nbsp; ✦ &nbsp; All data is updated in real-time &nbsp; ✦
        </p>
      </div>
    </>
  )
}

export default AdminHeader