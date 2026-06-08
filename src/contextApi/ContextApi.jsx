import React, { useState } from 'react'
import { createContext } from 'react'

export const searchContext=createContext()
export const profileContext=createContext()
export const careerContext=createContext()
export const adminProfileContext=createContext()

function ContextApi({children}) {
     const [globalSearchKey,setGlobalSearchKey]=useState("")
     const [profileStatus,setProfileStatus]=useState([])
     const [addCareerStatus,setAddCareerStatus]=useState("")
     const [adminProfileStatus, setAdminProfileStatus ]=useState([])
  return (
    <>
      <searchContext.Provider value={{globalSearchKey,setGlobalSearchKey}}>
        <profileContext.Provider value={{profileStatus,setProfileStatus}}>
          <careerContext.Provider value={{addCareerStatus,setAddCareerStatus}}>
            <adminProfileContext.Provider value={{adminProfileStatus, setAdminProfileStatus }}>
              {children}
            </adminProfileContext.Provider>
          </careerContext.Provider>
        </profileContext.Provider>
      </searchContext.Provider>
    </>
  )
}

export default ContextApi