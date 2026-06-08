import './App.css'
import Home from './users/pages/Home'
import Career from './users/pages/Career'
import AllBooks from './users/pages/AllBooks'
import Contact from './users/pages/Contact'
import UserProfile from './users/pages/UserProfile'
import ViewBook from './users/pages/ViewBook'
import PaymentSuccess from './users/pages/PaymentSuccess'
import PaymentError from './users/pages/PaymentError'

import Auth from './pages/Auth'
import Pnf from './pages/Pnf'

import Dashboard from './admin/pages/Dashboard'
import BookList from './admin/pages/BookList'
import CareerList from './admin/pages/CareerList'
import Settings from './admin/pages/Settings'

import Preloader from './components/Preloader'

import { Route,Routes } from 'react-router-dom'
import { useState,useEffect, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { authRoleContext } from './contextApi/AuthContextApi'

function App() {
  const [loading,setLoading]=useState(true)
  const {role}=useContext(authRoleContext)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },4000)
  },[])

  return (
    <>
    <Routes>
      {/* User */}
      <Route path='/' element={loading?<Preloader/>:<Home/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register/>} />

      {
        role==='User' &&
        <>
        <Route path='/books' element={<AllBooks/>} />
        <Route path='/books/:id/view' element={<ViewBook/>} />
        <Route path='/career' element={<Career/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/user-profile' element={<UserProfile/>} />
        <Route path='/payment-success' element={<PaymentSuccess/>} />
        <Route path='/payment-error' element={<PaymentError/>} />
       </>
      }

      {/* Admin */}
      {
        role==='admin' &&
        <>
        <Route path='/admin-dashboard' element={loading?<Preloader/>:<Dashboard/>} />
        <Route path='/admin-career' element={<CareerList/>} />
        <Route path='/admin-books' element={<BookList/>} />
        <Route path='/admin-settings' element={<Settings/>} />
        </>
      }

      <Route path='/*' element={<Pnf/>} />
    </Routes>
    <ToastContainer/>

    </>
  )
}

export default App
