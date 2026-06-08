import React from 'react'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

import { useContext } from 'react';
import { careerContext } from '../../contextApi/ContextApi';
import { adminAddJobPostApi } from '../../services/allApis'

function AddJob() {

    const [modalStatus, setModalStatus] = useState(false);  
    const [jobData,setJobData]=useState({
        title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
    })

    const {setAddCareerStatus}=useContext(careerContext)

    const handleReset=()=>{
        setJobData({
            title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
        })
    }

    const handleSubmit = async()=>{
        const {title,location,jobType,salary,experience,qualification,description} = jobData

        if(!title || !location || !jobType || !salary || !experience || !qualification || !description){
            toast.error("Enter valid inputs")
        } else {
            const response = await adminAddJobPostApi(jobData)

            if(response.status===200){
                toast.success("Job post added")
                handleReset()
                setModalStatus(false)
                setAddCareerStatus(response)
            } else {
                toast.error("Something went wrong")
                if(response?.data){
                    toast.info(response?.data)
                }
            }
        }
    }

  return ( 
    <>
        <button
            className="bg-emerald-700 text-white p-2 border border-emerald-700 rounded-sm hover:bg-white hover:text-emerald-700 transition"
            onClick={()=>setModalStatus(true)}
        >
            Add Job +
        </button>

        {modalStatus && (
        <div className="relative z-10">
            <div className="bg-black/60 fixed inset-0">
            <div className="flex justify-center items-center min-h-screen">

                <div className="bg-white rounded-2xl shadow-xl" style={{minHeight:'500px',width:'500px'}}>

                <div className="bg-emerald-800 text-white flex justify-between items-center p-3 rounded-t-2xl">
                    <h1 className="text-xl font-semibold">Application Form</h1>
                    <button onClick={()=>setModalStatus(false)}>
                        <IoClose className='text-2xl'/>
                    </button>
                </div>
                
                <div className='p-10'>
                    <input type="text" value={jobData.title}
                        onChange={(e)=>setJobData({...jobData,title:e.target.value})}
                        placeholder='Job Title'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <input type="text" value={jobData.location}
                        onChange={(e)=>setJobData({...jobData,location:e.target.value})}
                        placeholder='Location'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <input type="text" value={jobData.jobType}
                        onChange={(e)=>setJobData({...jobData,jobType:e.target.value})}
                        placeholder='Job Type'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <input type="text" value={jobData.salary}
                        onChange={(e)=>setJobData({...jobData,salary:e.target.value})}
                        placeholder='Salary'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <input type="text" value={jobData.qualification}
                        onChange={(e)=>setJobData({...jobData,qualification:e.target.value})}
                        placeholder='Qualification'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <input type="text" value={jobData.experience}
                        onChange={(e)=>setJobData({...jobData,experience:e.target.value})}
                        placeholder='Experience'
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />

                    <textarea
                        placeholder='Description'
                        value={jobData.description}
                        onChange={(e)=>setJobData({...jobData,description:e.target.value})}
                        className='p-2 border border-gray-300 bg-white rounded-sm w-full mb-3 focus:border-emerald-600 outline-none'
                    />
                </div>

                <div className='bg-gray-100 p-3 flex justify-end gap-3 rounded-b-2xl'>
                    <button
                        className='p-2 border border-red-500 rounded-sm bg-red-500 text-white hover:bg-white hover:text-red-500'
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                    <button
                        className='p-2 border border-emerald-600 rounded-sm bg-emerald-600 text-white hover:bg-white hover:text-emerald-600'
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>

                </div>
            </div>
            </div>
        </div>      
        )}
    </>
  )
}

export default AddJob