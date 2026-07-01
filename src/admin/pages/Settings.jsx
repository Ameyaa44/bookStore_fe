import React, { useEffect, useState, useContext } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { RiImageEditLine } from "react-icons/ri"
import base_url from '../../services/base_url'
import { getAdminProfileApi, AdminprofileUpdateApi } from '../../services/allApis'
import { toast } from 'react-toastify'
import { adminProfileContext } from '../../contextApi/ContextApi'

function Settings() {

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  })

  const [preview, setPreview] = useState("")
  const { setAdminProfileStatus } = useContext(adminProfileContext)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getAdminProfileData()
    }
  }, [])

  const getAdminProfileData = async () => {
    const response = await getAdminProfileApi()

    if (response.status === 200) {
      const admin = response.data

      setProfileData({
        username: admin.username || "",
        email: admin.email || "",
        password: admin.password || "",
        confirmPassword: admin.password || "",
        profilePic: admin.profile || ""
      })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setProfileData({ ...profileData, profilePic: file })
  }

  const handleReset = () => {
    getAdminProfileData()
    setPreview("")
  }

  const handleProfileEdit = async () => {

    const { username, email, password, confirmPassword, profilePic } = profileData

    if (!username || !email || !password || !confirmPassword) {
      return toast.warning("Enter valid details")
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    try {

      const formData = new FormData()
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)

      if (profilePic instanceof File) {
        formData.append("profile", profilePic)
      }

      const response = await AdminprofileUpdateApi(formData)

      if (response.status === 200) {
        toast.success("Profile updated successfully")

        const updated = response.data

        sessionStorage.setItem("dp", updated.profile)
        sessionStorage.setItem("uname", updated.username)

        setAdminProfileStatus(updated)
        getAdminProfileData()
        setPreview("")
      } else {
        toast.error("Update failed")
      }

    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const inputClass = "w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"

  return (
    <>
      <AdminHeader />

      <div className='min-h-[80vh] md:grid grid-cols-4 bg-[#FAF7F2]'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-3 px-6 py-8'>

          <div className="mb-8">
            <h1 className="font-serif-display text-2xl font-bold text-[#0D2818]">Admin Settings</h1>
            <p className="text-xs text-[#0D2818]/50 mt-1 uppercase tracking-[1.5px]">Manage your credentials and profile</p>
          </div>

          <div className='md:grid grid-cols-2 gap-10 items-start'>

            {/* Left info panel */}
            <div className='hidden md:block bg-white border border-[#E3DAC9]/60 rounded-3xl p-8 shadow-sm'>
              <h2 className="font-serif-display text-lg font-semibold text-[#0D2818] mb-3">Profile Security</h2>
              <div className="w-8 h-[1px] bg-[#C5A880] mb-5"></div>
              <p className='text-sm text-[#0D2818]/65 font-light leading-7'>
                Manage your admin profile credentials securely. Keep your password strong and your profile picture up to date for secure access.
              </p>
              <div className="mt-8 space-y-3">
                {['Strong unique password', 'Professional profile photo', 'Up-to-date email address'].map(tip => (
                  <div key={tip} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                    <span className="text-xs text-[#0D2818]/60 font-light">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form panel */}
            <div className='bg-white border border-[#E3DAC9]/60 rounded-3xl shadow-sm overflow-hidden'>

              {/* Header */}
              <div className="bg-[#0D2818] px-6 py-5 border-b border-[#C5A880]/20">
                <h2 className="font-serif-display text-base font-semibold text-[#C5A880]">Update Profile</h2>
              </div>

              <div className='p-6 space-y-5'>

                {/* IMAGE */}
                <div className="flex justify-center py-2">
                  <label htmlFor="profile_pic" className="relative cursor-pointer group flex justify-center items-center w-[120px] h-[120px] rounded-full border-2 border-[#C5A880]/40 p-0.5 hover:border-[#C5A880] transition-colors duration-300">
                    <input
                      type="file"
                      id="profile_pic"
                      hidden
                      onChange={handleImageUpload}
                    />
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={
                          preview
                            ? preview
                            : profileData.profilePic
                              ? profileData.profilePic.startsWith("http")
                                ? profileData.profilePic
                                : `${base_url}/uploadImg/${profileData.profilePic}`
                              : "https://static.vecteezy.com/system/resources/thumbnails/037/468/797/small/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png"
                        }
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 p-2 bg-[#C5A880] text-white rounded-full border-2 border-white shadow-md hover:bg-[#0D2818] transition-colors duration-200">
                      <RiImageEditLine size={14} />
                    </div>
                  </label>
                </div>

                {/* INPUTS */}
                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Username</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    placeholder="Admin username"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Email Address</label>
                  <input
                    type="text"
                    className={`${inputClass} opacity-60 cursor-not-allowed`}
                    value={profileData.email}
                    disabled
                    placeholder="Email (read-only)"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Password</label>
                  <input
                    type="password"
                    className={inputClass}
                    value={profileData.password}
                    onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    className={inputClass}
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-500 hover:text-white transition duration-300 font-semibold text-xs uppercase tracking-[1.5px] border border-transparent"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleProfileEdit}
                    className="py-3 rounded-xl bg-[#C5A880] text-[#0D2818] hover:bg-[#0D2818] hover:text-[#C5A880] transition duration-300 font-semibold text-xs uppercase tracking-[1.5px] border border-[#C5A880]/30 shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Settings