import React from 'react'
import { SignIn } from "@clerk/clerk-react"

const Signin = () => {
  return (
    <div className='flex justify-center items-center mt-6'>
        <SignIn/>
    </div>
  )
}

export default Signin