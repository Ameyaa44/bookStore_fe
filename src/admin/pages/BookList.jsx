import React, { useState, useEffect } from 'react'

import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

import {
  getAdminAllBooksApi,
  getAdminAllUsersApi,
  adminApproveBookApi
} from '../../services/allApis'

import base_url from '../../services/base_url'
import { toast } from 'react-toastify'

function BookList() {

  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  const [bookList, setBookList] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (bookStatus) getBookList()
    if (userStatus) getUserList()
  }, [userStatus])

  const getBookList = async () => {
    const response = await getAdminAllBooksApi()
    if (response.status === 200) setBookList(response.data)
  }

  const getUserList = async () => {
    const response = await getAdminAllUsersApi()
    if (response.status === 200) setUserList(response.data)
  }

  const handleBookApproval = async (id) => {
    const response = await adminApproveBookApi(id)
    if (response.status === 200) {
      toast.success("Book Approved!")
      getBookList()
    } else {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <AdminHeader />

      <div className='min-h-[80vh] grid grid-cols-1 md:grid-cols-4 bg-[#FAF7F2]'>

        <div className='md:col-span-1'>
          <AdminSidebar />
        </div>

        <div className='md:col-span-3 px-4 md:px-6 py-6'>

          <div className="mb-6">
            <h1 className="font-serif-display text-2xl font-bold text-[#0D2818]">Resource Management</h1>
            <p className="text-xs text-[#0D2818]/50 mt-1 uppercase tracking-[1.5px]">Books inventory & registered users</p>
          </div>

          {/* Tabs */}
          <div className='inline-flex bg-white rounded-xl border border-[#E3DAC9]/60 p-1 mb-8 shadow-sm'>

            <button
              onClick={() => { setBookStatus(true); setUserStatus(false); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[1px] transition-all duration-200 ${
                bookStatus
                  ? 'bg-[#0D2818] text-[#C5A880] shadow-sm'
                  : 'text-[#0D2818]/60 hover:text-[#0D2818]'
              }`}
            >
              All Books
            </button>

            <button
              onClick={() => { setBookStatus(false); setUserStatus(true); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[1px] transition-all duration-200 ${
                userStatus
                  ? 'bg-[#0D2818] text-[#C5A880] shadow-sm'
                  : 'text-[#0D2818]/60 hover:text-[#0D2818]'
              }`}
            >
              Users
            </button>

          </div>

          {/* BOOK SECTION */}
          {bookStatus && (
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>

              {bookList.length > 0 ? (
                bookList.map(item => (
                  <div key={item._id} className='bg-white border border-[#E3DAC9]/60 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col'>

                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={item?.image}
                        alt="book"
                        className='h-[240px] w-full object-cover'
                      />
                      {/* spine shadow */}
                      <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent"></div>
                    </div>

                    <h3 className='font-serif-display text-base font-semibold mt-3 text-[#0D2818] leading-snug'>
                      {item?.title}
                    </h3>

                    <p className='text-xs text-[#0D2818]/60 mt-1 font-light leading-5 flex-1'>
                      {item?.abstract?.slice(0, 70)}...
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className='text-[#C5A880] font-bold text-base'>₹{item?.price}</span>

                      {item?.status === "pending" ? (
                        <button
                          onClick={() => handleBookApproval(item._id)}
                          className='bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] text-xs font-semibold uppercase tracking-[1px] px-4 py-2 rounded-lg transition-all duration-300 border border-[#C5A880]/30'
                        >
                          Approve
                        </button>
                      ) : (
                        <span className='flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200'>
                          Approved ✓
                        </span>
                      )}
                    </div>

                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-12 bg-white border border-[#E3DAC9]/50 rounded-2xl'>
                  <p className='text-red-500/70 font-light uppercase tracking-[1px] text-sm'>No Books Available</p>
                </div>
              )}

            </div>
          )}

          {/* USER SECTION */}
          {userStatus && (
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

              {userList.length > 0 ? (
                userList.map(item => (
                  <div key={item._id} className='bg-white border border-[#E3DAC9]/60 rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-all duration-300'>

                    <div className="w-[56px] h-[56px] rounded-full border border-[#C5A880]/30 p-0.5 shrink-0">
                      <img
                        src={
                          item.profile
                            ? item.profile.startsWith("https://lh3.googleusercontent.com")
                              ? item.profile
                              : `${base_url}/uploadImg/${item.profile}`
                            : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                        }
                        alt="user"
                        className='w-full h-full rounded-full object-cover'
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className='text-[#0D2818] font-semibold text-sm truncate'>
                        {item?.username}
                      </h2>
                      <p className='text-xs text-[#0D2818]/55 font-light truncate mt-0.5'>
                        {item.email}
                      </p>
                    </div>

                  </div>
                ))
              ) : (
                <div className='col-span-full text-center py-12 bg-white border border-[#E3DAC9]/50 rounded-2xl'>
                  <p className='text-red-500/70 font-light uppercase tracking-[1px] text-sm'>No Users Available</p>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  )
}

export default BookList