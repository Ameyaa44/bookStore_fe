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
      <button className='text-blue-600 border border-r-blue-700 rounded-sm px-3 py-2 flex items-center gap-1 justify-center hover:bg-blue-700 hover:text-white'
        onClick={()=>setModalStatus(true)}>
        Edit
        <FaPen size={14} />
      </button>
      {modalStatus && (
          <div className="relative z-10" >
            <div className="bg-gray-500/75 fixed inset-0">
              <div className="flex justify-center items-center min-h-screen">
                <div style={{height:'100vh', width: "400px" }} className="bg-white rounded-2xl flex flex-col justify-between  ">
                  <div className="bg-black text-white flex justify-between items-center p-3 rounded-t-2xl">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <button onClick={()=>setModalStatus(false)}>
                      <IoClose />
                    </button>
                  </div>
                  <div className="p-5">
                    <label htmlFor="profilepic" className='flex justify-center relative cursor-pointer'>
                      <input type="file" name="" id="profilepic" className='hidden' onChange={(e)=>{handleImageUpload(e)}}/>
                      {
                        preview ?
                        <img src={preview} 
                         className=' rounded-full' width={'200px'} />
                        :
                        <img src={profileData.profile?(profileData.profile.startsWith("https://lh3.googleusercontent.com/a/ACg8ocIXufSvLUE46Oia28aUiKklAIqnHjhYZImAfJjOVhGScOzitfum=s96-c")?profileData.profile:`${base_url}/uploadImg/${profileData.profile}`):"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                         className=' rounded-full' width={'200px'} />
                      }
                      <button className='p-3 bg-amber-700 text-2xl text-white absolute rounded bottom-5 right-35'>
                        <FaPen />
                      </button>
                    </label>
                    <div className='py-5 flex flex-col gap-4 mb-4'>
                      <input type="text" placeholder="Username" defaultValue={profileData.username} onChange={(e)=>{setProfileData({...profileData,username:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <input type="text" placeholder="password" defaultValue={profileData.password} onChange={(e)=>{setProfileData({...profileData,password:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <input type="password" placeholder="Confirm Password" defaultValue={profileData.cpassword} onChange={(e)=>{setProfileData({...profileData,cpassword:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2"/>
                      <textarea name="" placeholder="Bio" value={profileData.bio} onChange={(e)=>{setProfileData({...profileData,bio:e.target.value})}} className="p-2 border bg-white placeholder-gray-600 rounded-sm w-full " id="">{profileData.bio}</textarea>
                    </div>
                  </div>
                  <div className="bg-gray p-3 flex justify-end gap-2 rounded-b-2xl">
                    <button className="p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-600 hover:text-red-500">Reset</button>
                    <button onClick={handleSubmit} className="p-2 border rounded-sm bg-green-700 text-white hover:bg-white hover:border-green-600 hover:text-green-500">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Edit