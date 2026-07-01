import React  from 'react'
import { useState , useEffect } from "react";
import { toast } from 'react-toastify';
import { useContext } from 'react';

import { FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getProfileApi ,profileUpdateApi } from '../../services/allApis';

import ContextApi from '../../contextApi/ContextApi';
import { profileContext } from '../../contextApi/ContextApi';

import base_url from '../../services/base_url';

function Edit() {

    const [modalStatus,setModalStatus]=useState(false)
    const [profileData,setProfileData]=useState({
      username:"",password:"",cpassword:"",profile:"",bio:"",role:""
    })
    const[preview,setPreview]=useState("")
    const {profileStatus,setProfileStatus}=useContext(profileContext)

  useEffect(()=>{
    if(sessionStorage.getItem('token') && modalStatus){
      getProfiledata()
    }
  },[modalStatus])

    const getProfiledata=async()=>{
      const response=await getProfileApi()
      if(response.status===200){
        console.log(response.data)
        const user=response.data
        setProfileData({
          username:user?.username,password:user?.password,cpassword:user?.password,profile:user?.profile,bio:user?.bio,role:user?.role
        })
      }
    }

    // console.log(profileData)
    const handleSubmit=async()=>{
      console.log(profileData)
      const {username,password,cpassword,bio,profile}=profileData
      if(!username || !password || !cpassword || !bio ){
        toast.warning("Enter valid Inputs")
      }
      else{
        if(password!==cpassword){
          toast.error("Passwords mismatches!!")
        }
        else{
          const formData=new FormData()
          if(preview){
            for(let key in profileData){
              formData.append(key,profileData[key])
            }
            const response=await profileUpdateApi(formData)
            console.log(response)
            if(response.status===200){
              toast.success("Profile Updated Successfully!")
              getProfiledata()
              const userData=response.data
              sessionStorage.setItem('uname',userData?.username)
              sessionStorage.setItem('bio',userData?.bio)
              sessionStorage.setItem('profile',userData?.profile)
              setProfileStatus(userData)
              setModalStatus(false)
            }
            else{
            toast.error("Something went wrong")
            }
          }
          else{
            const response = await profileUpdateApi(profileData)
            console.log(response)
            if(response.status===200){
              toast.success("Profile Updated Successfully!")
              getProfiledata()
              const userData=response.data
              sessionStorage.setItem('uname',userData?.username)
              sessionStorage.setItem('bio',userData?.bio)
              sessionStorage.setItem('profile',userData?.profile)
              setProfileStatus(userData)
              setModalStatus(false)
            }
            else{
            toast.error("Something went wrong")
            }
          }
        }
      }
    }
    

    const handleImageUpload=(e)=>{
      const imageFile=e.target.files[0]
      const previewUrl=URL.createObjectURL(imageFile)
      setPreview(previewUrl)
      setProfileData({...profileData,profile:imageFile})
    }
    console.log(preview)

  return (
    <>
      <button className='text-[#C5A880] border border-[#C5A880]/60 hover:bg-[#C5A880] hover:text-[#0D2818] rounded-xl px-5 py-2.5 flex items-center gap-2 justify-center transition-all duration-300 font-semibold text-xs uppercase tracking-[1px]'
        onClick={()=>setModalStatus(true)}>
        <span>Edit Profile</span>
        <FaPen size={11} />
      </button>
      {modalStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl flex flex-col justify-between w-full max-w-[420px] border border-[#E3DAC9]/60 overflow-hidden" style={{ maxHeight: '90vh' }}>
            
            {/* MODAL HEADER */}
            <div className="bg-[#0D2818] text-white flex justify-between items-center px-6 py-5 border-b border-[#C5A880]/30">
              <h1 className="font-serif-display text-lg tracking-[1px] font-semibold text-[#C5A880]">Edit Reader Profile</h1>
              <button onClick={()=>setModalStatus(false)} className="text-[#C5A880] hover:text-white transition duration-200">
                <IoClose size={24} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* IMAGE UPLOAD CONTAINER */}
              <div className="flex justify-center">
                <label htmlFor="profilepic" className='relative cursor-pointer group flex justify-center items-center w-[150px] h-[150px] rounded-full border-2 border-[#C5A880]/40 p-1 shadow-inner hover:border-[#C5A880] transition-colors duration-300'>
                  <input type="file" name="" id="profilepic" className='hidden' onChange={(e)=>{handleImageUpload(e)}}/>
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {preview ? (
                      <img src={preview} className='w-full h-full object-cover' alt="profile" />
                    ) : (
                      <img src={profileData.profile ? (profileData.profile.startsWith("https://lh3.googleusercontent.com") ? profileData.profile : `${base_url}/uploadImg/${profileData.profile}`) : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className='w-full h-full object-cover' alt="profile" />
                    )}
                  </div>
                  <div className='p-2.5 bg-[#C5A880] text-white absolute rounded-full bottom-0 right-1 border-2 border-white shadow-md hover:bg-[#0D2818] transition-colors duration-200'>
                    <FaPen size={12} />
                  </div>
                </label>
              </div>

              {/* INPUT FIELDS */}
              <div className='space-y-4 pt-2'>
                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Username</label>
                  <input type="text" placeholder="Username" defaultValue={profileData.username} onChange={(e)=>{setProfileData({...profileData,username:e.target.value})}} className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"/>
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Password</label>
                  <input type="text" placeholder="••••••••" defaultValue={profileData.password} onChange={(e)=>{setProfileData({...profileData,password:e.target.value})}} className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"/>
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" defaultValue={profileData.cpassword} onChange={(e)=>{setProfileData({...profileData,cpassword:e.target.value})}} className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"/>
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Biography</label>
                  <textarea placeholder="Write a short literary bio..." value={profileData.bio} onChange={(e)=>{setProfileData({...profileData,bio:e.target.value})}} className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200" rows={3}></textarea>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="bg-[#FAF7F2] p-5 border-t border-[#E3DAC9]/60 flex justify-end gap-3 rounded-b-3xl">
              <button className="px-5 py-3 border border-transparent rounded-xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition duration-300 font-semibold text-xs uppercase tracking-[1.5px]">Reset</button>
              <button onClick={handleSubmit} className="px-7 py-3 border border-[#C5A880] bg-[#C5A880] text-[#0D2818] hover:bg-[#0D2818] hover:text-[#C5A880] transition duration-300 font-semibold text-xs uppercase tracking-[1.5px] rounded-xl shadow-sm">Save Changes</button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Edit