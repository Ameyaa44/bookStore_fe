import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../../components/Footer'

import { FaLocationDot } from "react-icons/fa6";
import { RiShareForward2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { ListJobPostApi, applyJobPostApi } from '../../services/allApis';
import { toast } from 'react-toastify';

function Career() {

  const [modalStatus, setModalStatus] = useState(false);
  const [careerList, setCareerlist] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [careerData, setCareerData] = useState({
    fullname: "", qualification: "", email: "", phone: "", coverletter: "", resume: "", jobId: "", jobTitle: ""
  });

  const fileInputRef = useRef();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getCareerList();
      setLoginStatus(sessionStorage.getItem('token'));
    } else {
      setLoginStatus("");
    }
  }, [searchKey]);

  const getCareerList = async () => {
    const response = await ListJobPostApi(searchKey);
    if (response.status === 200) {
      setCareerlist(response.data);
    }
  };

  const openModal = (id, title) => {
    setModalStatus(true);
    setCareerData({ ...careerData, jobId: id, jobTitle: title });
  };

  const handleApplyJob = async () => {
    const { fullname, qualification, email, phone, coverletter, resume, jobId } = careerData;

    if (!fullname || !qualification || !email || !phone || !coverletter) {
      return toast.warning("Please fill in all required fields.");
    }
    if (!resume || !(resume instanceof File)) {
      return toast.warning("Please upload your resume (PDF) before submitting.");
    }
    if (resume.type !== 'application/pdf') {
      return toast.warning("Only PDF files are accepted for resume upload.");
    }
    if (!jobId) {
      return toast.error("Invalid job reference. Please close and try again.");
    }

    const formData = new FormData();
    for (let i in careerData) {
      formData.append(i, careerData[i]);
    }

    const response = await applyJobPostApi(formData);
    if (response.status === 200) {
      toast.success("Application sent successfully!");
      setModalStatus(false);
      setCareerData({ fullname: "", qualification: "", email: "", phone: "", coverletter: "", resume: "", jobId: "", jobTitle: "" });
    } else if (response.status === 400) {
      toast.error("You have already applied for this position.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    // preserve jobId and jobTitle so the submission context is not lost
    setCareerData(prev => ({
      fullname: "", qualification: "", email: "", phone: "", coverletter: "", resume: "",
      jobId: prev.jobId, jobTitle: prev.jobTitle
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Header />

      <div className="min-h-[80vh] px-6 md:px-32 py-16 bg-[#FAF7F2] transition-all duration-300">
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-serif-display font-bold text-[#0D2818]">Career Opportunities</h1>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
            <p className="text-sm text-[#0D2818]/70 mt-6 max-w-xl mx-auto font-light leading-7">
              Explore open positions at our press, curators circle, or logistics team and help shape the future of modern literary curation.
            </p>
          </div>

          {/* Search */}
          <div className="flex justify-center mb-12">
            <input
              onChange={(e) => setSearchKey(e.target.value)}
              type="text"
              className="w-full max-w-md p-3.5 pl-5 bg-white border border-[#E3DAC9] text-sm text-[#0D2818] placeholder-[#0D2818]/45 rounded-full shadow-sm focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-300 font-light"
              placeholder="Search by position name..."
            />
          </div>

          {/* Login check */}
          {loginStatus ? (
            <div className="space-y-6">

              {careerList.length > 0 ? (
                careerList.map(career => (
                  <div
                    key={career._id}
                    className="bg-white border border-[#E3DAC9]/60 rounded-3xl p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h2 className="text-xl font-serif-display font-semibold text-[#0D2818]">
                        {career?.title}
                      </h2>

                      <span className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold uppercase tracking-[1px]">
                        <FaLocationDot /> {career?.location}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    <div className="flex flex-wrap gap-2.5 mt-5">
                      <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/75 font-light">
                        Type: {career?.jobType}
                      </span>
                      <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/75 font-light">
                        Reward: {career?.salary}
                      </span>
                      <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/75 font-light">
                        Degree: {career?.qualification}
                      </span>
                      <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/75 font-light">
                        Experience: {career?.experience}
                      </span>
                    </div>

                    <p className="mt-6 text-sm text-[#0D2818]/70 leading-7 font-light">{career?.description}</p>

                    <div className="flex justify-end mt-6 pt-4 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => openModal(career?._id, career?.title)}
                        className="flex items-center gap-2 bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] px-5 py-2.5 rounded-xl border border-[#C5A880]/30 hover:border-transparent transition-all duration-300 font-semibold text-xs uppercase tracking-[1px]"
                      >
                        Apply Now <RiShareForward2Fill />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 bg-white border border-[#E3DAC9]/50 rounded-3xl text-center">
                  <p className="text-red-500/80 font-light text-base uppercase tracking-[1px]">No positions currently listed</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[#E3DAC9]/60 rounded-3xl p-8 shadow-sm">
              <img src="./logintry.jpg" className="w-48 mx-auto rounded-2xl opacity-75 border border-[#E3DAC9]/40" />
              <p className="mt-6 text-sm text-[#0D2818]/70 font-light">
                Please <Link to="/login" className="text-[#C5A880] font-semibold underline hover:text-[#0D2818]">Login</Link> to view available job descriptions
              </p>
            </div>
          )}

          {/* Modal */}
          {modalStatus && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full max-w-[480px] rounded-3xl shadow-2xl border border-[#E3DAC9]/60 overflow-hidden flex flex-col" style={{ maxHeight: '90vh' }}>

                <div className="flex justify-between items-center bg-[#0D2818] text-white px-6 py-5 border-b border-[#C5A880]/30">
                  <h1 className="font-serif-display text-lg tracking-[1px] font-semibold text-[#C5A880]">Job Application</h1>
                  <button onClick={() => setModalStatus(false)} className="text-[#C5A880] hover:text-white transition duration-200">
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">
                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Full Name</label>
                    <input className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition" placeholder="Full Name"
                      value={careerData.fullname}
                      onChange={(e) => setCareerData({ ...careerData, fullname: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Qualification</label>
                    <input className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition" placeholder="B.A. English / Computer Science"
                      value={careerData.qualification}
                      onChange={(e) => setCareerData({ ...careerData, qualification: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Email Address</label>
                    <input className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition" placeholder="yourname@gmail.com"
                      value={careerData.email}
                      onChange={(e) => setCareerData({ ...careerData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Phone Number</label>
                    <input className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition" placeholder="+91 98765 43210"
                      value={careerData.phone}
                      onChange={(e) => setCareerData({ ...careerData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Cover Letter</label>
                    <textarea className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition" rows={3} placeholder="Tell us about yourself..."
                      value={careerData.coverletter}
                      onChange={(e) => setCareerData({ ...careerData, coverletter: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Resume File (PDF)</label>
                    <input type="file"
                      ref={fileInputRef}
                      accept=".pdf,application/pdf"
                      className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition cursor-pointer"
                      onChange={(e) => setCareerData({ ...careerData, resume: e.target.files[0] })}
                    />
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-5 border-t border-[#E3DAC9]/60 flex justify-end gap-3 rounded-b-3xl">
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 border border-transparent rounded-xl text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition duration-300 font-semibold text-xs uppercase tracking-[1.5px]"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleApplyJob}
                    className="px-7 py-3 border border-[#C5A880] bg-[#C5A880] text-[#0D2818] hover:bg-[#0D2818] hover:text-[#C5A880] transition duration-300 font-semibold text-xs uppercase tracking-[1.5px] rounded-xl shadow-sm"
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Career;