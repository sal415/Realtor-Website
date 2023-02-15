import { getAuth, SAMLAuthProvider, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  console.log("user", auth.currentUser.uid);
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Profile Updated successfully");
    } catch (error) {
      toast.error("Unable to update profile details.");
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(collection(db, "listings"));

      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      console.log("listings:", listings);
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-lg text-center mt-6 font-semibold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-lg bg-white border-gray-200 rounded transition ease-in-out ${
                changeDetail && "bg-blue-200 focus:bg-blue-200"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-lg bg-white border-gray-200 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <h1 className="flex items-center">
                Want to edit your details?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="cursor-pointer text-red-500 hover:text-red-600 transition ease-in-out ml-1"
                >
                  {" "}
                  {changeDetail ? "Apply" : "Edit"}
                </span>
              </h1>
              <h1
                className="cursor-pointer text-blue-500 hover:text-blue-600 transition ease-in-out"
                onClick={onLogout}
              >
                Sign out
              </h1>
            </div>
          </form>
          <button
            className="w-full bg-blue-400 text-white font-semibold px-7 py-3 hover:bg-blue-500"
            type="submit"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              Rent or Sell your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
        <>
          <h2 className="text-2xl text-center font-semibold mb-6">
            My Current Listings
          </h2>

          <ul className="">
            {listings?.map((listing) => {
              // console.log(listing)
              return (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              );
            })}
          </ul>
        </>
        
          )} 
      </div>
    </>
  );
}
