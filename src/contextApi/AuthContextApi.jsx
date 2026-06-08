import React,{useState,useEffect} from 'react'
import { createContext } from 'react'

export const authRoleContext=createContext()

function AuthContextApi({children}) {
    const [role,setRole]=useState("")

    useEffect(()=>{
        if(sessionStorage.getItem('token') && sessionStorage.getItem('role')){
            setRole(sessionStorage.getItem('role'))
        }
    },[role])

  return (
    <>
    <authRoleContext.Provider value={{role,setRole}}>
        {children}
    </authRoleContext.Provider>
    </>
  )
}

export default AuthContextApi