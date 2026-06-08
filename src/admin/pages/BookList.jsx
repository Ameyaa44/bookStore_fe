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

      <div className='min-h-[60vh] grid grid-cols-1 md:grid-cols-4 bg-gray-50'>

        <div className='md:col-span-1'>
          <AdminSidebar />
        </div>

        <div className='md:col-span-3 px-3 md:px-5'>

          <h2 className='text-center text-3xl font-bold text-gray-800 my-6'>
            Resource Management
          </h2>

          {/* Tabs */}
          <div className='flex justify-center items-center'>

            <div
              onClick={() => { setBookStatus(true); setUserStatus(false); }}
              className={
                bookStatus
                  ? "px-5 py-2 border-t-2 border-blue-600 text-blue-600 font-semibold cursor-pointer"
                  : "px-5 py-2 border-b text-gray-600 cursor-pointer"
              }
            >
              All Books
            </div>

            <div
              onClick={() => { setBookStatus(false); setUserStatus(true); }}
              className={
                userStatus
                  ? "px-5 py-2 border-t-2 border-green-600 text-green-600 font-semibold cursor-pointer"
                  : "px-5 py-2 border-b text-gray-600 cursor-pointer"
              }
            >
              Users
            </div>

          </div>

          {/* BOOK SECTION */}
          {bookStatus && (
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-3'>

              {bookList.length > 0 ? (
                bookList.map(item => (
                  <div className='bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition'>

                    <img
                      src={item?.image}
                      alt="book"
                      className='h-[280px] w-full object-cover rounded-lg'
                    />

                    <h3 className='text-lg font-semibold mt-3 text-gray-800'>
                      {item?.title}
                    </h3>

                    <p className='text-gray-500 text-sm'>
                      {item?.abstract?.slice(0, 60)}...
                    </p>

                    <h4 className='text-blue-600 font-bold text-lg mt-2'>
                      ₹{item?.price}
                    </h4>

                    {item?.status === "pending" ? (
                      <button
                        onClick={() => handleBookApproval(item._id)}
                        className='mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
                      >
                        Approve
                      </button>
                    ) : (
                      <p className='text-green-600 font-semibold text-center mt-3'>
                        Approved ✓
                      </p>
                    )}

                  </div>
                ))
              ) : (
                <p className='text-center text-red-500 col-span-full'>
                  No Books Available
                </p>
              )}

            </div>
          )}

          {/* USER SECTION */}
          {userStatus && (
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 px-3'>

              {userList.length > 0 ? (
                userList.map(item => (
                  <div className='bg-white shadow-md rounded-xl p-4 flex gap-4 items-center'>

                    <img
                      src={
                        item.profile
                          ? item.profile.startsWith("https://lh3.googleusercontent.com")
                            ? item.profile
                            : `${base_url}/uploadImg/${item.profile}`
                          : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                      }
                      alt="user"
                      className='w-[70px] h-[70px] rounded-full object-cover'
                    />

                    <div>
                      <h2 className='text-blue-600 font-semibold'>
                        {item?.username}
                      </h2>

                      <p className='text-sm text-gray-600 break-all'>
                        {item.email}
                      </p>
                    </div>

                  </div>
                ))
              ) : (
                <p className='text-center text-red-500 col-span-full'>
                  No Users Available
                </p>
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