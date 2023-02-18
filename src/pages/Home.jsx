import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { db } from '../firebase'
import {Link} from 'react-router-dom'

export default function Home() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)



   useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(listingRef);
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
  }, []);





  if(loading) {
    return <Loading/>
  }
  return (
    <div className='flex flex-wrap justify-center align-items'>
      {
        listings.map((x)=>{
          console.log(x)
          return(
            <div className='w-[30%] border-gray-500 mb-12'>

                <img className='w-[90%] h-[90%] mt-10' src={x.data.imgUrls}/>
                <p className='text-cyan-600'>Listing Name: {x.data.name}</p>
                <p className='text-cyan-600'>Address: {x.data.address}</p>
                <p className='text-cyan-600'># of Bathrooms: {x.data.bathrooms}</p>
                <p className='mb-10 text-cyan-600'># of Bedrooms: {x.data.bedrooms}</p>

            </div>
          )
        })
      }
    </div>
  )
}

