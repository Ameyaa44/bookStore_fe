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
    } else toast.error("Signup Failed")
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
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">

        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <FaRegUserCircle className="text-5xl text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white">
          {register ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="text-green-100 mt-2">
          {register
            ? "Create your bookstore account"
            : "Login to continue reading"}
        </p>

      </div>

      {/* Form */}
      <div className="p-8">

        <div className="space-y-4">

          {register && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {!register && (
            <div className="text-end">
              <span className="text-green-600 text-sm cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>
          )}

          <button
            onClick={register ? handleRegister : handleLogin}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.01] transition-all"
          >
            {register ? "Create Account" : "Login"}
          </button>

          {!register && (
            <>
              <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
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

        <div className="text-center mt-8">

          {register ? (
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              New User?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
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