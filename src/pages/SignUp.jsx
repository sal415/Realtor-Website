import React, { useState } from 'react'
// import { Form } from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({name:"", email: "", password: ""})
    const {name, email, password} = formData;
    const navigate = useNavigate()

    function onChange(e){
        console.log(e.target.value)
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.id]: e.target.value,
        }) )
    } 

    async function onSubmit(e) {
      e.preventDefault()
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser,{
          displayName: name,
        });
        const user = userCredential.user
        // console.log(user)
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, "users", user.uid), formDataCopy)
        toast.success("Account was successfully created!")
        navigate('/')
      } catch (error) {
        toast.error("Something went wrong! Please check all fields. ")
      }
    }

  return (
    <section>
       <h1 className = "text-3xl text-center mt-6 font-bold">Sign Up</h1>
       <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
            <img className='rounded-2xl' src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' alt='house' />
        </div>

            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'> 
                <form onSubmit={onSubmit}> 
                    <input type='text' id='name' value={name}  onChange={onChange} placeholder="Full Name:" 
                    className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                    
                    <input type='email' id='email' value={email}  onChange={onChange} placeholder="Enter your email address" 
                    className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" />
                    <div className='relative mb-6'>
                    
                    <input type={showPassword ? 'text' : 'password'} id='password' value={password} onChange={onChange} placeholder="Password"
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out " /> 
                    {showPassword ? <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} /> : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() =>  setShowPassword ((prevState) => !prevState)}/>}

                    </div>
                    <div className=' flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                        <p className='mb-6'> Have an account?
                            <Link to="/sign-in" className='text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out'> Sign In</Link>
                            </p>
                        <p>
                            <Link to="/forgot-password" className='text-red-500 hover:text-red-600 duration-200'>Forgot Password? </Link>
                        </p>
                    </div>
                <button type="submit" className='w-full hover:bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md bg-slate-500 transition duration-150 ease-in-out hover:shadow-xl active:bg-blue-900 '>Sign Up</button>
                <div className=' flex items-center my-4 before:border-t  before:flex-1  before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                    <p className='text-center font-semibold mx-4'>OR</p>
                </div>
                <OAuth/>
                </form>
            </div>
            </div> 
        </section>
  )
}