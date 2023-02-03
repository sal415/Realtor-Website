import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  return (

     <>
            <Router>
                 <Routes>
                     <Route path='/' element={<Home/>}/>
                     <Route path='/profile' element={<Profile/>}/>
                     <Route path='/sign-in' element={<SignIn/>}/>
                     <Route path='/sign-up' element={<SignUp/>}/>
                     <Route path='/offers' element={<Offers/>}/>
                     <Route path='/forgot-password' element={<ForgotPassword/>}/>
                 </Routes>
         </Router>
        </>
    // <div className="App">
    //   <h1 className = 'text-2xl bg-red-400'>hello world</h1>\
    //   <h1 className="text-3xl font-bold underline">
    //     Hello world!
    //   </h1>
      

    // </div>
  )
}

export default App
