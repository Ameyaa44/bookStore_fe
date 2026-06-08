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
    const formData = new FormData();
    for (let i in careerData) {
      formData.append(i, careerData[i]);
    }

    const response = await applyJobPostApi(formData);
    if (response.status === 200) {
      toast.success("Application sent!");
      setModalStatus(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleReset = () => {
    setCareerData({
      fullname: "", qualification: "", email: "", phone: "", coverletter: "", resume: ""
    });
    fileInputRef.current.value = "";
  };

  return (
    <>
      <Header />

      <div className="min-h-[60vh] px-6 md:px-40 py-10 bg-gray-50">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800">Career Opportunities</h1>

        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Explore exciting job opportunities and build your future with us.
        </p>

        {/* Search */}
        <div className="flex justify-center my-8">
          <input
            onChange={(e) => setSearchKey(e.target.value)}
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#237251]"
            placeholder="Search job title..."
          />
        </div>

        {/* Login check */}
        {loginStatus ? (
          <div className="space-y-5">

            {careerList.length > 0 ? (
              careerList.map(career => (
                <div
                  key={career._id}
                  className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-xl transition"
                >

                  <h1 className="text-xl font-semibold text-gray-800">
                    {career?.title}
                  </h1>

                  <p className="flex items-center gap-2 text-gray-500 mt-2">
                    <FaLocationDot className="text-[#1B4332]" />
                    {career?.location}
                  </p>

                  <div className="grid md:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                    <p>Type: {career?.jobType}</p>
                    <p>Salary: {career?.salary}</p>
                    <p>Qualification: {career?.qualification}</p>
                    <p>Experience: {career?.experience}</p>
                  </div>

                  <p className="mt-3 text-gray-700">{career?.description}</p>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => openModal(career?._id, career?.title)}
                      className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#27664c] text-white px-4 py-2 rounded-lg"
                    >
                      Apply <RiShareForward2Fill />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-red-500">No jobs available</p>
            )}
          </div>
        ) : (
          <div className="text-center mt-20">
            <img src="./logintry.jpg" className="w-64 mx-auto" />
            <p className="mt-4 text-gray-700">
              Please <Link to="/login" className="text-[#1B4332] underline">Login</Link> to view jobs
            </p>
          </div>
        )}

        {/* Modal */}
        {modalStatus && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[95%] md:w-[500px] rounded-xl shadow-lg">

              <div className="flex justify-between items-center bg-[#1B4332] text-white p-4 rounded-t-xl">
                <h1 className="text-lg font-semibold">Apply Job</h1>
                <button onClick={() => setModalStatus(false)}>
                  <IoClose size={22} />
                </button>
              </div>

              <div className="p-5 space-y-3">

                <input className="w-full border p-2 rounded" placeholder="Full Name"
                  value={careerData.fullname}
                  onChange={(e) => setCareerData({ ...careerData, fullname: e.target.value })}
                />

                <input className="w-full border p-2 rounded" placeholder="Qualification"
                  value={careerData.qualification}
                  onChange={(e) => setCareerData({ ...careerData, qualification: e.target.value })}
                />

                <input className="w-full border p-2 rounded" placeholder="Email"
                  value={careerData.email}
                  onChange={(e) => setCareerData({ ...careerData, email: e.target.value })}
                />

                <input className="w-full border p-2 rounded" placeholder="Phone"
                  value={careerData.phone}
                  onChange={(e) => setCareerData({ ...careerData, phone: e.target.value })}
                />

                <textarea className="w-full border p-2 rounded" placeholder="Cover Letter"
                  value={careerData.coverletter}
                  onChange={(e) => setCareerData({ ...careerData, coverletter: e.target.value })}
                />

                <input type="file"
                  ref={fileInputRef}
                  className="w-full border p-2 rounded"
                  onChange={(e) => setCareerData({ ...careerData, resume: e.target.files[0] })}
                />
              </div>

              <div className="flex justify-end gap-2 p-4 bg-gray-50 rounded-b-xl">

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Reset
                </button>

                <button
                  onClick={handleApplyJob}
                  className="px-4 py-2 bg-[#1B4332] text-white rounded hover:bg-[#255d45]"
                >
                  Submit
                </button>

              </div>

            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  )
}

export default Career