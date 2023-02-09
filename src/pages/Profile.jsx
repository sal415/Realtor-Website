import { getAuth, SAMLAuthProvider } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const [formData, setFormData] = useState({name: 'sal', email:'salmandoria@gmail.com',});
  const {name, email} = formData
  const auth = getAuth()
  const navigate = useNavigate()
  function onLogout() {
    auth.signOut()
    navigate('/')
  }
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-lg text-center mt-6 font-semibold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form>
          <input type='text' id='name' value={name} disabled className='mb-6 w-full px-4 py-2 text-lg bg-white border-gray-200 rounded transition ease-in-out'/>

          <input type="email" id="email" value={email} disabled className='mb-6 w-full px-4 py-2 text-lg bg-white border-gray-200 rounded transition ease-in-out'/>

        <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
          <h1 className='flex items-center'>Would you like to change your name?
          <span className='cursor-pointer text-red-500 hover:text-red-600 transition ease-in-out ml-1'>Edit</span>
        </h1>
        <h1 className='cursor-pointer text-blue-500 hover:text-blue-600 transition ease-in-out' onClick={onLogout}>Sign out</h1>
        </div>

        </form>
      </div>
      </section>
    
      </>
  )
}
