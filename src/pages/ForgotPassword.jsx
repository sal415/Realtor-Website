import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import React from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password link");
    }
  }
  return (
    <section className="items-center ">
      <h1 className="text-3xl text-center mt-6 mr-8 font-bold">Forgot Password</h1>
      <div className="">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 content-center">
          <img
            src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' 
            alt="house"
            className="w-full rounded-2xl ml-80 mt-3"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl  bg-white border-blue-500 rounded ml-80"
            />

            <div className=" flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6 ml-80">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600  hover:text-red-700 transition duration-200 ease-in-out ml-2">
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-60">
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="mb-10 w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 ml-80"
              type="submit">
              Send reset password link
            </button>
            <div className=" ">
              <p className="text-center font-semibold mx-4"></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}