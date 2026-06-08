import React from 'react'

function Preloader() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <img
        src="/book-preloader.gif"
        alt="loading"
        width={90}
      />
    </div>
  )
}

export default Preloader