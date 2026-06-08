import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='min-h-screen  flex justify-center items-center bg-gray-700 text-white'>
      <div className='w-[50%] h-[50%] '>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/011/314/479/small/illustrations-woman-using-binocular-looking-internet-connections-for-oops-404-error-design-concept-landing-page-vector.jpg" alt="" className='w-[60%] h-[60%] mx-auto' />
        <h1 className='text-center my-2'>Oh no!</h1>
        <h2 className='text-center text-xl my-2'>Looks Like You're Lost</h2>
        <h5 className='text-center my-2'>The page you are looking for is not available</h5>
        <div className='flex justify-center my-2'>

          <Link to={'/'} className='bg-blue-700 p-3 rounded-xl'>Go Back</Link>
        </div>
      </div>
      
    </div>
  )
}

export default PageNotFound