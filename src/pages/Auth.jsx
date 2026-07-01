import React, { useState, useContext } from 'react'
import { FaRegUserCircle } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { signupApi, signinApi, googleSigninApi } from '../services/allApis'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { authRoleContext } from '../contextApi/AuthContextApi'

function Auth({ register }) {

  const navigate = useNavigate()
  const { setRole } = useContext(authRoleContext)

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async () => {
    const { username, email, password } = user
    if (!username || !email || !password) return toast.info("Enter Valid Data")

    const res = await signupApi(user)
    if (res.status === 200) {
      toast.success("Signup Successful")
      setUser({ username: "", email: "", password: "" })
      navigate('/login')
    } else toast.error("User Already Exist!")
  }

  const handleLogin = async () => {
    const { email, password } = user
    if (!email || !password) return toast.info("Enter Valid Data")

    const res = await signinApi({ email, password })

    if (res.status === 200) {
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('uname', res.data.username)
      sessionStorage.setItem('dp', res.data.profile)
      sessionStorage.setItem('bio', res.data.bio)
      sessionStorage.setItem('role', res.data.role)

      setRole(res.data.role)

      toast.success("Login Successful")

      setUser({ username: "", email: "", password: "" })

      navigate(res.data.role === "admin" ? '/admin-dashboard' : '/')
    } else {
      toast.error("Login Failed")
    }
  }

  const handleGoogleLogin = async (cred) => {
    const decoded = jwtDecode(cred?.credential)

    const data = {
      username: decoded?.given_name,
      email: decoded?.email,
      profile: decoded?.picture
    }

    const res = await googleSigninApi(data)

    if (res.status === 200) {
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('uname', res.data.username)
      sessionStorage.setItem('dp', res.data.profile)
      sessionStorage.setItem('bio', res.data.bio)
      sessionStorage.setItem('role', res.data.role)

      setRole(res.data.role)

      toast.success("Login Successful")
      navigate('/')
    } else toast.error("Google Login Failed")
  }

  return (
  <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4 py-10 transition-all duration-300">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-[#E3DAC9]/60 overflow-hidden">

      {/* Header */}
      <div className="bg-[#0D2818] p-8 text-center border-b border-[#C5A880]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20"></div>

        <div className="flex justify-center mb-4 relative z-10">
          <div className="bg-white/5 p-3 rounded-full border border-[#C5A880]/20">
            <FaRegUserCircle className="text-4xl text-[#C5A880]" />
          </div>
        </div>

        <h1 className="text-3xl font-serif-display font-bold text-white relative z-10">
          {register ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="text-[#EAE0D5]/70 mt-2 text-xs uppercase tracking-[1.5px] relative z-10">
          {register
            ? "Join our premium reader circle"
            : "Sign in to access your vault"}
        </p>

      </div>

      {/* Form */}
      <div className="p-8">

        <div className="space-y-5">

          {register && (
            <div>
              <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#C5A880] uppercase tracking-[1.5px] font-semibold mb-1.5 ml-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full p-3.5 bg-[#FAF7F2]/60 border border-[#E3DAC9]/60 focus:bg-white text-sm rounded-xl placeholder-[#0D2818]/45 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition duration-200"
            />
          </div>

          {!register && (
            <div className="text-end">
              <span className="text-[#C5A880] hover:text-[#0D2818] text-xs font-semibold uppercase tracking-[0.5px] cursor-pointer hover:underline transition duration-200">
                Forgot Password?
              </span>
            </div>
          )}

          <button
            onClick={register ? handleRegister : handleLogin}
            className="w-full bg-[#0D2818] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D2818] py-3.5 rounded-xl font-semibold text-xs uppercase tracking-[2px] border border-[#C5A880]/20 hover:border-transparent transition-all duration-300 shadow-md"
          >
            {register ? "Create Account" : "Login"}
          </button>

          {!register && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-[#E3DAC9]/60"></div>
                <span className="px-3 text-[#0D2818]/45 text-[10px] uppercase tracking-[1.5px] font-semibold">
                  Or Connect With
                </span>
                <div className="flex-1 border-t border-[#E3DAC9]/60"></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google Login Failed")}
                />
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-8 pt-6 border-t border-[#FAF7F2]">

          {register ? (
            <p className="text-sm text-[#0D2818]/70 font-light">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#C5A880] font-semibold uppercase tracking-[0.5px] text-xs hover:text-[#0D2818] transition duration-200"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className="text-sm text-[#0D2818]/70 font-light">
              New User?{" "}
              <Link
                to="/register"
                className="text-[#C5A880] font-semibold uppercase tracking-[0.5px] text-xs hover:text-[#0D2818] transition duration-200"
              >
                Register
              </Link>
            </p>
          )}

        </div>

      </div>

    </div>

  </div>
)
}

export default Auth