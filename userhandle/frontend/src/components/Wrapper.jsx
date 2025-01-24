import React from 'react'

function Wrapper({children}) {
  return (
    <div className='bg-gray-500 flex h-screen items-center w-full justify-center overflow-hidden  '>
       {children}
    </div>

    
  )
}

export default Wrapper