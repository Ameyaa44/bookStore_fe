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
      <div className='w-full p-5 flex justify-between bg-white shadow-sm border-b border-gray-200'>
        
        <div className='flex items-center gap-2'>
          <img src="/logo.png" alt="" className='w-[45px]' />
          <span className='text-xl font-semibold text-emerald-700'>
            Book Store Admin
          </span>
        </div>

        <button
          onClick={adminLogout}
          className='flex items-center gap-2 border border-red-500 text-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition'
        >
          <IoPower />
          Logout
        </button>

      </div>

      <div className='bg-emerald-700 text-white p-2'>
        <marquee>
          Welcome, Admin! You're all set to manage and monitor the system. Let's get to work!
        </marquee>
      </div>
    </>
  )
}

export default AdminHeader