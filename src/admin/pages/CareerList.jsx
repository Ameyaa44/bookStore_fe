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

      <div className="min-h-[60vh] grid grid-cols-1 md:grid-cols-4 bg-gray-50">

        {/* Sidebar */}
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        {/* Main */}
        <div className="md:col-span-3 p-5">

          <h1 className="text-center text-3xl font-bold text-gray-800 my-6">
            Career Management
          </h1>

          {/* Tabs */}
          <div className="flex justify-center my-5">
            <div
              onClick={() => {
                setJobStatus(true);
                setApplicationStatus(false);
              }}
              className={
                jobStatus
                  ? "px-5 py-2 border-t-2 border-blue-600 text-blue-600 font-semibold cursor-pointer"
                  : "px-5 py-2 border-b text-gray-600 cursor-pointer"
              }
            >
              Job Posts
            </div>

            <div
              onClick={() => {
                setJobStatus(false);
                setApplicationStatus(true);
              }}
              className={
                applicationStatus
                  ? "px-5 py-2 border-t-2 border-green-600 text-green-600 font-semibold cursor-pointer"
                  : "px-5 py-2 border-b text-gray-600 cursor-pointer"
              }
            >
              Applications
            </div>
          </div>

          {/* JOB SECTION */}
          {jobStatus && (
            <>
              <div className="flex justify-between items-center px-5 mb-5">
                <input
                  type="text"
                  placeholder="Search job title..."
                  className="border p-2 rounded-md w-[250px] focus:outline-blue-500"
                  onChange={(e) => setsearchKey(e.target.value)}
                />

                <AddJobPost />
              </div>

              <div className="grid gap-5 px-5">
                {jobList.length > 0 ? (
                  jobList.map((job) => (
                    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">

                      <div className="flex justify-between">
                        <h2 className="text-xl font-bold text-gray-800">
                          {job.title}
                        </h2>

                        <button
                          onClick={() => deleteJobPost(job?._id)}
                          className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition"
                        >
                          Delete <FaTrash />
                        </button>
                      </div>

                      <p className="flex items-center gap-2 text-blue-600 mt-3">
                        <FaLocationDot /> {job.location}
                      </p>

                      <div className="mt-3 text-gray-700 space-y-1">
                        <p><b>Type:</b> {job.jobType}</p>
                        <p><b>Salary:</b> {job.salary}</p>
                        <p><b>Qualification:</b> {job.qualification}</p>
                        <p><b>Experience:</b> {job.experience}</p>
                        <p className="text-gray-600 mt-2">{job.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-red-500">No Job Posts Available</p>
                )}
              </div>
            </>
          )}

          {/* APPLICATION SECTION */}
          {applicationStatus && (
            <div className="px-5 mt-5">

              {applicationList.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                  <table className="min-w-[900px] w-full border">

                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Job</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Qualification</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Cover Letter</th>
                        <th className="p-2">Resume</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applicationList.map((a, i) => (
                        <tr key={i} className="text-center border-b hover:bg-gray-50">
                          <td className="p-2">{i + 1}</td>
                          <td className="p-2">{a.jobTitle}</td>
                          <td className="p-2">{a.fullname}</td>
                          <td className="p-2">{a.qualification}</td>
                          <td className="p-2">{a.email}</td>
                          <td className="p-2">{a.phone}</td>
                          <td className="p-2 max-w-[200px]">{a.coverletter}</td>
                          <td className="p-2">
                            <a
                              href={`${base_url}/resumes/${a.resume}`}
                              className="text-blue-600 underline"
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
                <p className="text-center text-red-500 text-lg">
                  No Applications Available
                </p>
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