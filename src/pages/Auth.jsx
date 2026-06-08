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

    if (!username || !email || !password) {
      return toast.info("Enter Valid Data")
    }

    const res = await signupApi(user)

    if (res.status === 200) {
      toast.success("Signup Successful")
      setUser({ username: "", email: "", password: "" })
      navigate('/login')
    } else {
      toast.error("Signup Failed")
    }
  }

  const handleLogin = async () => {
    const { email, password } = user

    if (!email || !password) {
      return toast.info("Enter Valid Data")
    }

    const res = await signinApi({ email, password })

    if (res.status === 200) {

      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('uname', res.data.username)
      sessionStorage.setItem('dp', res.data.profile)
      sessionStorage.setItem('bio', res.data.bio)
      sessionStorage.setItem('role', res.data.role)

      setRole(res.data.role)

      toast.success("Login Successful")

      setUser({
        username: "",
        email: "",
        password: ""
      })

      navigate(
        res.data.role === "admin"
          ? "/admin-dashboard"
          : "/"
      )

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

    } else {
      toast.error("Google Login Failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-emerald-900 to-black px-4 py-10">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-green-400/20 shadow-2xl rounded-3xl p-8 text-white">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">

          <div className="bg-green-500/20 p-4 rounded-full mb-4">
            <FaRegUserCircle className="text-6xl text-emerald-300" />
          </div>

          <h1 className="text-3xl font-bold">
            {register ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-sm text-gray-300 mt-2">
            {register
              ? "Register to access Book Store"
              : "Login to continue"}
          </p>

        </div>

        {/* Form */}
        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {register && (
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          {!register && (
            <div className="flex justify-end">
              <span className="text-xs text-emerald-300 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>
          )}

          <button
            onClick={register ? handleRegister : handleLogin}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
          >
            {register ? "Create Account" : "Login"}
          </button>

          {!register && (
            <>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="flex-1 border-t border-green-400/20"></div>
                OR
                <div className="flex-1 border-t border-green-400/20"></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() =>
                    toast.error("Google Login Failed")
                  }
                />
              </div>
            </>
          )}

        </div>

        {/* Bottom Links */}
        <div className="text-center mt-8 text-sm text-gray-300">

          {register ? (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-300 font-semibold hover:underline cursor-pointer"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              New User?{" "}
              <Link
                to="/register"
                className="text-emerald-300 font-semibold hover:underline cursor-pointer"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>

    </div>
  )
}

export default Auth