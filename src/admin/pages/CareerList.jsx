import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/Footer";
import AddJobPost from "../components/AddJobPost";
import base_url from "../../services/base_url";

import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import {
  adminDeleteJobPostApi,
  adminListJobPostApi,
  getAdminApplicationsApi
} from "../../services/allApis";

import { toast } from "react-toastify";
import { careerContext } from "../../contextApi/ContextApi";

function CareerList() {
  const [jobStatus, setJobStatus] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [jobList, setjoblist] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const { addCareerStatus } = useContext(careerContext);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    if (jobStatus) getJobList();
    if (applicationStatus) getApplications();
  }, [addCareerStatus, searchKey, applicationStatus]);

  const getJobList = async () => {
    const response = await adminListJobPostApi(searchKey);
    if (response.status === 200) {
      setjoblist(response.data);
    }
  };

  const deleteJobPost = async (id) => {
    const response = await adminDeleteJobPostApi(id);
    if (response.status === 200) {
      getJobList();
      toast.success("Job deleted successfully");
    } else {
      toast.error("Delete failed");
    }
  };

  const getApplications = async () => {
    const response = await getAdminApplicationsApi();
    if (response.status === 200) {
      setApplicationList(response.data);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-4 bg-[#FAF7F2]">

        {/* Sidebar */}
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        {/* Main */}
        <div className="md:col-span-3 px-4 md:px-6 py-6">

          <div className="mb-6">
            <h1 className="font-serif-display text-2xl font-bold text-[#0D2818]">Career Management</h1>
            <p className="text-xs text-[#0D2818]/50 mt-1 uppercase tracking-[1.5px]">Job listings & incoming applications</p>
          </div>

          {/* Tabs */}
          <div className='inline-flex bg-white rounded-xl border border-[#E3DAC9]/60 p-1 mb-7 shadow-sm'>
            <button
              onClick={() => { setJobStatus(true); setApplicationStatus(false); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[1px] transition-all duration-200 ${
                jobStatus ? 'bg-[#0D2818] text-[#C5A880] shadow-sm' : 'text-[#0D2818]/60 hover:text-[#0D2818]'
              }`}
            >
              Job Posts
            </button>

            <button
              onClick={() => { setJobStatus(false); setApplicationStatus(true); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[1px] transition-all duration-200 ${
                applicationStatus ? 'bg-[#0D2818] text-[#C5A880] shadow-sm' : 'text-[#0D2818]/60 hover:text-[#0D2818]'
              }`}
            >
              Applications
            </button>
          </div>

          {/* JOB SECTION */}
          {jobStatus && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search job title..."
                  className="p-3 pl-4 bg-white border border-[#E3DAC9]/60 text-sm rounded-xl text-[#0D2818] placeholder-[#0D2818]/40 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition w-full sm:w-[260px]"
                  onChange={(e) => setsearchKey(e.target.value)}
                />
                <AddJobPost />
              </div>

              <div className="grid gap-4">
                {jobList.length > 0 ? (
                  jobList.map((job) => (
                    <div key={job._id} className="bg-white border border-[#E3DAC9]/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h2 className="font-serif-display text-lg font-semibold text-[#0D2818]">
                          {job.title}
                        </h2>

                        <button
                          onClick={() => deleteJobPost(job?._id)}
                          className="flex items-center gap-2 bg-red-50 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-[1px] transition-all duration-300"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                      </div>

                      <p className="flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold uppercase tracking-[1px] mt-3">
                        <FaLocationDot /> {job.location}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/70">Type: {job.jobType}</span>
                        <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/70">Salary: {job.salary}</span>
                        <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/70">Qualification: {job.qualification}</span>
                        <span className="bg-[#FAF7F2] border border-[#E3DAC9]/50 px-3 py-1 rounded-full text-xs text-[#0D2818]/70">Experience: {job.experience}</span>
                      </div>

                      <p className="text-xs text-[#0D2818]/60 mt-4 leading-6 font-light">{job.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white border border-[#E3DAC9]/50 rounded-2xl">
                    <p className="text-red-500/70 font-light uppercase tracking-[1px] text-sm">No Job Posts Available</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* APPLICATION SECTION */}
          {applicationStatus && (
            <div className="mt-2">
              {applicationList.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-[#E3DAC9]/60 shadow-sm">
                  <table className="min-w-[900px] w-full bg-white">

                    <thead>
                      <tr className="bg-[#0D2818] text-[#C5A880]">
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">#</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Job</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Name</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Qualification</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Email</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Phone</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Cover Letter</th>
                        <th className="p-3.5 text-xs font-semibold uppercase tracking-[1px] text-left">Resume</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applicationList.map((a, i) => (
                        <tr key={i} className={`border-b border-[#E3DAC9]/40 hover:bg-[#FAF7F2] transition text-sm text-[#0D2818]/80 ${i % 2 === 0 ? '' : 'bg-[#FAF7F2]/40'}`}>
                          <td className="p-3.5 text-[#C5A880] font-semibold">{i + 1}</td>
                          <td className="p-3.5 font-medium">{a.jobTitle}</td>
                          <td className="p-3.5">{a.fullname}</td>
                          <td className="p-3.5">{a.qualification}</td>
                          <td className="p-3.5 text-xs">{a.email}</td>
                          <td className="p-3.5 text-xs">{a.phone}</td>
                          <td className="p-3.5 max-w-[180px] text-xs text-[#0D2818]/60 truncate">{a.coverletter}</td>
                          <td className="p-3.5">
                            <a
                              href={`${base_url}/resumes/${a.resume}`}
                              className="text-xs text-[#C5A880] font-semibold underline hover:text-[#0D2818] transition"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-[#E3DAC9]/50 rounded-2xl">
                  <p className="text-red-500/70 font-light uppercase tracking-[1px] text-sm">No Applications Available</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default CareerList;