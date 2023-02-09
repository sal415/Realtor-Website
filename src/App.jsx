import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
 

// // import Listing from './pages/Listing'

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getFirestore} from 'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKF9dNmZBV4igc9wdoPt_A32V-sDt2fog",
//   authDomain: "realtor3-d6318.firebaseapp.com",
//   projectId: "realtor3-d6318",
//   storageBucket: "realtor3-d6318.appspot.com",
//   messagingSenderId: "700844975018",
//   appId: "1:700844975018:web:34cd38db961c51259f81d3"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
// export const db = getFirestore()
// const db = getFirestore()
// // const auth = getAuth(app)

function App() {

  return (

     <>
            <Router>
                <Header/>
                 <Routes>
                     <Route path='/' element={<Home/>}/>
                     <Route path='/profile' element={<Profile/>}/>
                     <Route path='/sign-in' element={<SignIn/>}/>
                     <Route path='/sign-up' element={<SignUp/>}/>
                     <Route path='/offers' element={<Offers/>}/>
                     {/* <Route path='/category/:categoryName/:listingId' element={<Listing/> }/> */}
                     <Route path='/forgot-password' element={<ForgotPassword/>}/>
                 </Routes>
         </Router>
        <ToastContainer 
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/> 
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
