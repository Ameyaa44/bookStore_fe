import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { CiSquarePlus } from "react-icons/ci";
import { toast } from 'react-toastify';
import { addBookApi,getUserBooksApi,removeUserBookApi,getBoughtBooksApi } from '../../services/allApis';

import Edit from '../components/Edit';
import base_url from '../../services/base_url';

import { profileContext } from '../../contextApi/ContextApi';
import { useContext } from 'react';

function UserProfile() {

   const [sellStatus,setSellStatus] = useState(true)
   const [bookStatus,setBookStatus] = useState(false)
   const [purchaseStatus,setPurchaseStatus] = useState(false)
   const[addedBooks,setAddedBooks] = useState([])
   const[boughtBooks,setBoughtBooks] = useState([])
   const [username,setUsername] = useState("")
   const [profileImage,setProfileImage] = useState("")
   const [bio,setBio] = useState("")
   const {profileStatus,setProfileStatus} = useContext(profileContext)

   const [bookDetails,setBookDetails] = useState({title:"",author:"",noOfPages:"",image:"",price:"",discountPrice:"",
    abstract:"",publisher:"",language:"",isbn:"",category:"",uploadImg:[]
   })

   const [preview,setPreview] = useState("")
   const [previewList,setPreviewList] = useState([])

   useEffect(()=>{
   if(bookStatus)
     userBooks()
   if(purchaseStatus){
     getBoughtBooks()
  }
   },[bookStatus,purchaseStatus])

   useEffect(()=>{
    if(sessionStorage.getItem('token')){
        setUsername(sessionStorage.getItem('uname'))
        setProfileImage(sessionStorage.getItem('dp'))
        setBio(sessionStorage.getItem('bio'))
    }
   },[profileStatus])

  const userBooks = async()=>{
  const response = await getUserBooksApi()
  console.log(response)
  if(response.status===200){
    setAddedBooks(response?.data)
  }
  }

  const handleRemoveBook = async(id)=>{
    const response = await removeUserBookApi(id)
    if(response.status===200){
      toast.success("Book removed succesfully.")
      userBooks()
    }
    else{
      toast.error("Book removal failed!")
    }
  }

  const getBoughtBooks = async()=>{
   const response=await getBoughtBooksApi()
   if(response.status===200){
      setBoughtBooks(response?.data)
   }
   else{
    console.log(response)
   }
  }

   const handleBookImageUpload = (e)=>{
    const imgFile = e.target.files[0]
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    bookDetails.uploadImg.push(imgFile)
    const bookImgList = previewList
    bookImgList.push(url)
    setPreviewList(bookImgList)
   }
   
  //  console.log(previewList)

   const handleAddBookSubmit = async()=>{
    console.log(bookDetails)
    const {title, author, noOfPages, image, price, discountPrice, abstract, publisher, language, isbn,
      category, uploadImg } = bookDetails
    if(!title || !author || !noOfPages || !image || !price || !discountPrice || !abstract || !publisher ||
       !language || !isbn || !category || uploadImg.length<=0){
       toast.warning("Enter valid inputs")
       }
    else{
      const formData = new FormData()
      formData.append('title',title)
      formData.append('author',author)
      formData.append('noOfPages',noOfPages)
      formData.append('image',image)
      formData.append('price',price)
      formData.append('discountPrice',discountPrice)
      formData.append('abstract',abstract)
      formData.append('publisher',publisher)
      formData.append('language',language)
      formData.append('isbn',isbn)
      formData.append('category',category)
     formData.append('uploadImg',uploadImg)
     const response = await addBookApi(formData)
     if(response.status===200){
      toast.success("Book details uploaded successfully")
      setBookDetails({title:"",author:"",noOfPages:"",image:"",price:"",discountPrice:"",
    abstract:"",publisher:"",language:"",isbn:"",category:"",uploadImg:[]
     })
     setPreview("")         
     setPreviewList([])     
     }
     else{
      toast.error("Book details Uploading failed!!!")
     }
    }
  }

  return (
    <>
      <Header />
      <div className='min-h-[80vh] bg-[#FAF7F2] pb-16'>
        
        {/* PREMIUM COVER BANNER */}
        <div className='w-full bg-gradient-to-r from-[#0A1C12] via-[#0D2818] to-[#0A1C12] h-[25vh] md:h-[35vh] relative border-b border-[#C5A880]/20 select-none'>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-30"></div>
          
          {/* PROFILE IMAGE WITH GOLD RING */}
          <div className="absolute left-6 md:left-20 -bottom-16 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white p-1 shadow-md border border-[#E3DAC9] ring-4 ring-[#C5A880]/20 overflow-hidden">
            <img
              src={
                profileImage
                  ? profileImage.startsWith("https://lh3.googleusercontent.com")
                    ? profileImage
                    : `${base_url}/uploadImg/${profileImage}`
                  : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
              }
              className='rounded-full w-full h-full object-cover'
              alt="profile"
            />
          </div>
        </div>

        {/* PROFILE HEADER & BIO */}
        <div className='mt-24 px-6 md:px-20 max-w-7xl mx-auto'>
          <div className='flex justify-between items-start border-b border-[#E3DAC9]/60 pb-6'>
            <div>
              <h1 className="font-serif-display font-bold text-3xl text-[#0D2818] tracking-wide">
                {username}
              </h1>
              {/* <p className="text-xs text-[#C5A880] uppercase tracking-[2px] font-semibold mt-1">Reader</p> */}
            </div>
            <Edit />
          </div>
          <p className='text-justify text-sm text-[#0D2818]/75 leading-8 my-6 font-light max-w-3xl'>
            {bio || "Welcome to your personal bookshelf. Configure your profile, list your physical editions for consignment, or inspect your ongoing orders."}
          </p>
        </div>

        {/* PILL NAVIGATION TABS */}
        <div className='flex flex-wrap justify-center items-center gap-3 my-12 border-b border-[#E3DAC9]/40 pb-5 max-w-2xl mx-auto px-6'>
          <button
            className={sellStatus ? 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 bg-[#0D2818] text-[#C5A880] border border-[#C5A880]/30 shadow-sm' : 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 text-[#0D2818]/70 hover:text-[#0D2818] bg-white border border-[#E3DAC9]/50 hover:border-[#C5A880] cursor-pointer'}
            onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }}
          >
            Sell Edition
          </button>
          
          <button
            className={bookStatus ? 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 bg-[#0D2818] text-[#C5A880] border border-[#C5A880]/30 shadow-sm' : 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 text-[#0D2818]/70 hover:text-[#0D2818] bg-white border border-[#E3DAC9]/50 hover:border-[#C5A880] cursor-pointer'}
            onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }}
          >
            Book Status
          </button>
          
          <button
            className={purchaseStatus ? 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 bg-[#0D2818] text-[#C5A880] border border-[#C5A880]/30 shadow-sm' : 'px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[1.5px] transition duration-300 text-[#0D2818]/70 hover:text-[#0D2818] bg-white border border-[#E3DAC9]/50 hover:border-[#C5A880] cursor-pointer'}
            onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }}
          >
            Purchase Library
          </button>
        </div>

        {/* TAB CONTENT: SELL BOOK FORM */}
        {sellStatus && (
          <div className='px-6 md:px-20 max-w-4xl mx-auto'>
            <div className='bg-white border border-[#E3DAC9]/60 rounded-3xl p-8 md:p-12 shadow-sm'>
              <h2 className='font-serif-display text-2xl font-bold text-[#0D2818] text-center mb-8'>
                Consign Your Volume
              </h2>
              
              <div className='md:grid grid-cols-2 gap-6'>
                {/* Left Fields Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Edition Title</label>
                    <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='The Great Gatsby' value={bookDetails.title} onChange={(e) => { setBookDetails({ ...bookDetails, title: e.target.value }) }} />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Author Name</label>
                    <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='F. Scott Fitzgerald' value={bookDetails.author} onChange={(e) => { setBookDetails({ ...bookDetails, author: e.target.value }) }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Page Count</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='180' value={bookDetails.noOfPages} onChange={(e) => { setBookDetails({ ...bookDetails, noOfPages: e.target.value }) }} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Category</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='Fiction' value={bookDetails.category} onChange={(e) => { setBookDetails({ ...bookDetails, category: e.target.value }) }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Cover Image URL</label>
                    <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='https://images.unsplash.com/...' value={bookDetails.image} onChange={(e) => { setBookDetails({ ...bookDetails, image: e.target.value }) }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Original Price</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='₹499' value={bookDetails.price} onChange={(e) => { setBookDetails({ ...bookDetails, price: e.target.value }) }} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Consigned Price</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='₹399' value={bookDetails.discountPrice} onChange={(e) => { setBookDetails({ ...bookDetails, discountPrice: e.target.value }) }} />
                    </div>
                  </div>
                </div>

                {/* Right Fields Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Publisher Details</label>
                    <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='Scribner' value={bookDetails.publisher} onChange={(e) => { setBookDetails({ ...bookDetails, publisher: e.target.value }) }} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Language</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='English' value={bookDetails.language} onChange={(e) => { setBookDetails({ ...bookDetails, language: e.target.value }) }} />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">ISBN Reference</label>
                      <input type="text" className='p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full' placeholder='978-0743273565' value={bookDetails.isbn} onChange={(e) => { setBookDetails({ ...bookDetails, isbn: e.target.value }) }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Abstract / Synopsis</label>
                    <textarea className='p-3.5 w-full bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition' rows={3} placeholder='Enter synopsis details...' value={bookDetails.abstract} onChange={(e) => { setBookDetails({ ...bookDetails, abstract: e.target.value }) }}></textarea>
                  </div>

                  {/* DROPZONE IMAGE UPLOADER */}
                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">Verification Clicks (Max 3)</label>
                    <label htmlFor="imginp" className='flex flex-col items-center justify-center border border-dashed border-[#C5A880]/60 bg-[#FAF7F2]/40 rounded-2xl p-5 cursor-pointer hover:bg-white hover:border-[#C5A880] transition duration-300'>
                      <input type="file" className='hidden' id='imginp' onChange={(e) => { handleBookImageUpload(e) }} />
                      
                      {!preview ? (
                        <div className="text-center p-2">
                          <svg className="mx-auto h-10 w-10 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-2 text-[11px] text-[#0D2818]/60 font-light uppercase tracking-[0.5px]">Upload verification images</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <img src={preview} alt="preview" className='max-h-24 object-contain rounded-lg shadow-sm border border-[#E3DAC9]/40' />
                          <span className="text-[10px] text-[#C5A880] mt-2 font-medium">Cover selected</span>
                        </div>
                      )}
                    </label>

                    {/* IMAGES GALLERY */}
                    {preview && (
                      <div className='flex justify-center items-center gap-4 mt-4 bg-[#FAF7F2]/60 p-3 rounded-xl border border-[#E3DAC9]/40'>
                        {previewList?.map((item, idx) => (
                          <img key={idx} src={item} alt="preview-thumb" className="w-[45px] h-[45px] object-cover rounded-lg border border-[#C5A880]/30 shadow-sm" />
                        ))}
                        {previewList.length < 3 && (
                          <label htmlFor="imginp" className='cursor-pointer text-[#C5A880] hover:text-[#0D2818] transition duration-200'>
                            <input type="file" className='hidden' id='imginp' onChange={(e) => { handleBookImageUpload(e) }} />
                            <CiSquarePlus size={28} />
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className='mt-8 pt-6 border-t border-[#E3DAC9]/40 flex justify-end gap-3'>
                <button className='px-6 py-3 border border-transparent rounded-xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition duration-300 font-semibold text-xs uppercase tracking-[2px]'>
                  Reset
                </button>
                <button className='px-8 py-3 bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] border border-transparent hover:border-[#C5A880] rounded-xl font-semibold text-xs uppercase tracking-[2px] transition duration-300 shadow-md' onClick={handleAddBookSubmit}>
                  Submit Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: CONSIGNMENT STATUS LIST */}
        {bookStatus && (
          <div className='px-6 md:px-20 max-w-5xl mx-auto'>
            {addedBooks.length > 0 ? (
              <div className="space-y-6">
                {addedBooks.map(item => (
                  <div key={item._id} className='w-full bg-white border border-[#E3DAC9]/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden'>
                    <div className='flex flex-col md:flex-row gap-6'>
                      
                      {/* Spine Cover Book Image */}
                      <div className='relative md:w-44 w-full h-[220px] rounded-xl overflow-hidden shadow-md border border-[#E3DAC9]/40 flex-shrink-0'>
                        <img
                          src={item.image}
                          alt="book"
                          className='w-full h-full object-cover'
                        />
                        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent"></div>
                      </div>

                      <div className='flex-grow flex flex-col justify-between py-2'>
                        <div>
                          <div className='flex justify-between items-start gap-4'>
                            <h3 className='text-2xl font-serif-display font-bold text-[#0D2818] tracking-wide'>
                              {item.title}
                            </h3>
                            <button onClick={() => { handleRemoveBook(item._id) }} className='bg-red-50 border border-transparent hover:border-red-500 text-red-600 hover:bg-red-600 hover:text-white text-xs font-semibold px-4 py-2 rounded-lg transition duration-300'>
                              Remove
                            </button>
                          </div>
                          
                          <h4 className='text-[#C5A880] font-serif-display font-semibold text-lg mt-2'>₹{item.price}</h4>
                          <p className='text-xs text-[#0D2818]/70 mt-4 leading-6 font-light line-clamp-3'>{item.abstract}</p>
                        </div>

                        {/* STATUS BADGES */}
                        <div className='mt-6 flex items-center gap-3'>
                          <span className="text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold">Listing Status:</span>
                          <div className='inline-block border border-[#E3DAC9]/30 rounded-lg p-1.5 bg-[#FAF7F2]'>
                            {item.status === 'pending' ? (
                              <img src="./pending-logo.jpeg" alt="pending" className="h-[25px] w-[50px] object-contain rounded-md" />
                            ) : (
                              <img src="./approve-logo.jpeg" alt="approved" className="h-[25px] w-[50px] object-contain rounded-md" />
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center py-20 bg-white border border-[#E3DAC9]/50 rounded-3xl p-8 shadow-sm text-center'>
                <img
                  src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                  className='w-[200px] object-contain'
                  alt="nobooks"
                />
                <h3 className='text-xl font-serif-display font-bold text-[#0D2818] mt-6'>
                  No Editions Consigned
                </h3>
                <p className="text-sm text-[#0D2818]/60 mt-2 font-light">List your books inside the 'Sell Edition' workspace to begin.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: PURCHASE HISTORY LIBRARY */}
        {purchaseStatus && (
          <div className='px-6 md:px-20 max-w-5xl mx-auto'>
            {boughtBooks.length > 0 ? (
              <div className="space-y-6">
                {boughtBooks.map(item => (
                  <div key={item._id} className='w-full bg-white border border-[#E3DAC9]/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-300 relative overflow-hidden'>
                    <div className='flex flex-col md:flex-row gap-6'>
                      
                      {/* Spine Cover Book Image */}
                      <div className='relative md:w-44 w-full h-[220px] rounded-xl overflow-hidden shadow-md border border-[#E3DAC9]/40 flex-shrink-0'>
                        <img
                          src={item.image}
                          alt="book"
                          className='w-full h-full object-cover'
                        />
                        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent"></div>
                      </div>

                      <div className='flex-grow flex flex-col justify-between py-2'>
                        <div>
                          <div className='flex justify-between items-start gap-4'>
                            <h3 className='text-2xl font-serif-display font-bold text-[#0D2818] tracking-wide'>
                              {item.title}
                            </h3>
                            <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full font-semibold uppercase tracking-[1px]">Purchased ✓</span>
                          </div>
                          <h4 className='text-[#C5A880] font-serif-display font-semibold text-lg mt-2'>${item.price}</h4>
                          <p className='text-xs text-[#0D2818]/70 mt-4 leading-6 font-light line-clamp-3'>{item.abstract}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center py-20 bg-white border border-[#E3DAC9]/50 rounded-3xl p-8 shadow-sm text-center'>
                <img
                  src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
                  className='w-[200px] object-contain'
                  alt="nobooks"
                />
                <h3 className='text-xl font-serif-display font-bold text-[#0D2818] mt-6'>
                  Library is Empty
                </h3>
                <p className="text-sm text-[#0D2818]/60 mt-2 font-light">Explore catalog and acquire works to expand your personal archive.</p>
              </div>
            )}
          </div>
        )}
        
      </div>
      <Footer />
    </>
  );
}
  export default UserProfile;