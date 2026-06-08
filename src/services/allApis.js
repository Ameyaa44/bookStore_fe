import commonApi from "./commonApi";
import base_url from "./base_url";

// Signup api request
export const signupApi = async(data)=>{
    return await commonApi(`${base_url}/signup`,'POST',data,'')
}

// Signin api
export const signinApi = async(data)=>{
    return await commonApi(`${base_url}/signin`,'POST',data,'')
}

//Google signin Api
export const googleSigninApi = async(data)=>{
    return await commonApi(`${base_url}/google-login`,'POST',data,'')
}

// Authorized user based api

// Add book Api
export const addBookApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multi-part/form-data"
    }
    return await commonApi(`${base_url}/add-book`,'POST',data,header)
}

// All Books Api
export const allBooksApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/all-books?search=${search}`,'GET',{},header)
}

// getBookById Api
export const getBookByIdApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/getbookbyid/${id}`,'GET',{},header)

}

//Last 4 books
export const latestBookApi = async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/latest-books`,'GET',{},header)
        
}

//get user added books api 
export const getUserBooksApi = async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/user-books`,'GET',{},header)
        
}

// remove user book by id
export const removeUserBookApi = async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/get-book/${id}/delete`,'DELETE',{},header)
        
}

// get user bought books api
export const getBoughtBooksApi = async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/bought-books`,'GET',{},header)
        
}

//profile Update
export const profileUpdateApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/profile-update`,'PUT',data,header)
}

// list job post
export const ListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/list-jobpost?search=${search}`,'GET',{},header)
}

//Get Profile
export const getProfileApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/get-profile`,'GET',{},header)
}

//Apply for Job
export const applyJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multi-part/form-data"
    }
    return await commonApi(`${base_url}/apply-jobpost`,'POST',data,header)
}

// purchase book
export const purchaseBookApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
    }
    return await commonApi(`${base_url}/purchase-book`,'POST',data,header)
}


// ADMIN

export const getAdminAllBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-books`,'GET',{},header)
}

// get all users
export const getAdminAllUsersApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-users`,'GET',{},header)
}

// approve book
export const adminApproveBookApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/approve-book/${id}`,'PATCH',{},header)
}

// add job post
export const adminAddJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/add-jobpost`,'POST',data,header)
}

// list job post
export const adminListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/list-jobpost?search=${search}`,'GET',{},header)
}

// delete job post
export const adminDeleteJobPostApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/delete-jobpost/${id}`,'DELETE',{},header)
}

//list application
export const getAdminApplicationsApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-application`,'GET',{},header)
}

//Admin profile Update
export const AdminprofileUpdateApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/update-profile`,'PUT',data,header)
}

//Get admin Profile Data
export const getAdminProfileApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/get-profile`,'GET',{},header)
}