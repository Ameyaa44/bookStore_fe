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

      // only append if file selected
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

  return (
    <>
      <AdminHeader />

      <div className='min-h-[60vh] md:grid grid-cols-4'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-3'>
          <h1 className='text-3xl text-center my-5'>Admin Settings</h1>

          <div className='md:grid grid-cols-2'>
            <div className='p-2'>
              <p className='text-justify'>
                Manage admin profile, credentials and system settings securely.
              </p>
            </div>

            <div className='p-2'>
              <div className='w-full bg-sky-300 py-4 px-5'>

                {/* IMAGE */}
                <label htmlFor="profile_pic" className="flex justify-center cursor-pointer">
                  <input
                    type="file"
                    id="profile_pic"
                    hidden
                    onChange={handleImageUpload}
                  />

                  <div className="relative">
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
                      className="w-[110px] h-[110px] rounded-full object-cover"
                    />

                    <RiImageEditLine
                      size={24}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1"
                    />
                  </div>
                </label>

                {/* INPUTS */}
                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-3 py-2 p-2"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  placeholder="Username"
                />

                <input
                  type="text"
                  className="w-full bg-white border rounded-sm my-3 py-2 p-2"
                  value={profileData.email}
                  disabled
                  placeholder="Email"
                />

                <input
                  type="password"
                  className="w-full bg-white border rounded-sm my-3 py-2 p-2"
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  placeholder="Password"
                />

                <input
                  type="password"
                  className="w-full bg-white border rounded-sm my-3 py-2 p-2"
                  value={profileData.confirmPassword}
                  onChange={(e) =>
                    setProfileData({ ...profileData, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                />

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={handleReset}
                    className="bg-red-500 text-white p-3 rounded"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleProfileEdit}
                    className="bg-green-500 text-white p-3 rounded"
                  >
                    Update
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