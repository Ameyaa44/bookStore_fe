import React from 'react'
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

import { useContext } from 'react';
import { careerContext } from '../../contextApi/ContextApi';
import { adminAddJobPostApi } from '../../services/allApis'

function AddJob() {

    const [modalStatus, setModalStatus] = useState(false);  
    const [jobData, setJobData] = useState({
        title: "", location: "", jobType: "", salary: "", experience: "", qualification: "", description: ""
    })

    const { setAddCareerStatus } = useContext(careerContext)

    const handleReset = () => {
        setJobData({
            title: "", location: "", jobType: "", salary: "", experience: "", qualification: "", description: ""
        })
    }

    const handleSubmit = async () => {
        const { title, location, jobType, salary, experience, qualification, description } = jobData

        if (!title || !location || !jobType || !salary || !experience || !qualification || !description) {
            toast.error("Enter valid inputs")
        } else {
            const response = await adminAddJobPostApi(jobData)

            if (response.status === 200) {
                toast.success("Job post added")
                handleReset()
                setModalStatus(false)
                setAddCareerStatus(response)
            } else {
                toast.error("Something went wrong")
                if (response?.data) {
                    toast.info(response?.data)
                }
            }
        }
    }

    const inputClass = "w-full p-3 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition"

    const fields = [
        { key: 'title',         label: 'Job Title',       placeholder: 'e.g. Senior Curator' },
        { key: 'location',      label: 'Location',        placeholder: 'City, Country' },
        { key: 'jobType',       label: 'Job Type',        placeholder: 'Full-time / Remote / Part-time' },
        { key: 'salary',        label: 'Salary / Reward', placeholder: '₹ or Annual CTC' },
        { key: 'qualification', label: 'Qualification',   placeholder: 'Minimum degree required' },
        { key: 'experience',    label: 'Experience',      placeholder: 'e.g. 2+ years' },
    ]

    return (
        <>
            <button
                className="bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] border border-[#C5A880]/30 hover:border-transparent px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold text-xs uppercase tracking-[1px]"
                onClick={() => setModalStatus(true)}
            >
                + Add Job Post
            </button>

            {modalStatus && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#E3DAC9]/60 w-full max-w-[500px] overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>

                        {/* Header */}
                        <div className="bg-[#0D2818] flex justify-between items-center px-6 py-5 border-b border-[#C5A880]/20">
                            <h1 className="font-serif-display text-lg font-semibold text-[#C5A880] tracking-[0.5px]">New Job Posting</h1>
                            <button onClick={() => setModalStatus(false)} className="text-[#C5A880] hover:text-white transition">
                                <IoClose size={22} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto space-y-4">
                            {fields.map(({ key, label, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">{label}</label>
                                    <input
                                        type="text"
                                        value={jobData[key]}
                                        onChange={(e) => setJobData({ ...jobData, [key]: e.target.value })}
                                        placeholder={placeholder}
                                        className={inputClass}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Description</label>
                                <textarea
                                    placeholder="Detailed job description..."
                                    value={jobData.description}
                                    onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                                    className={inputClass}
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#FAF7F2] p-5 border-t border-[#E3DAC9]/60 flex justify-end gap-3 rounded-b-3xl">
                            <button
                                className="px-5 py-3 border border-transparent rounded-xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition duration-300 font-semibold text-xs uppercase tracking-[1.5px]"
                                onClick={handleReset}
                            >
                                Reset
                            </button>

                            <button
                                className="px-7 py-3 border border-[#C5A880] bg-[#C5A880] text-[#0D2818] hover:bg-[#0D2818] hover:text-[#C5A880] transition duration-300 font-semibold text-xs uppercase tracking-[1.5px] rounded-xl shadow-sm"
                                onClick={handleSubmit}
                            >
                                Publish
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default AddJob