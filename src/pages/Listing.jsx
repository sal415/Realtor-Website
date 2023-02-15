import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { db } from '../firebase'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore,{EffectFade, Navigation, Pagination} from 'swiper'
// import 'swiper/css/autoplay'
import 'swiper/css/bundle'



export default function Listing () {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    SwiperCore.use([Navigation, Pagination])
    useEffect(() => {
        async function fetchListing(){
            const docRef = doc(db, 'listings',params.listingId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
                // console.log(listing)
            }
        }
        fetchListing()
      },[params.listingId])
      console.log(listing)
      if (loading){
        return <Loading/>
      }


//  function contact() {

//  }
  return (
    <main>
        <img className='w-[50%] m-auto mb-3  ' src={listing.imgUrls[0] }/>
        <img className='w-[50%] m-auto mb-3 ' src={listing.imgUrls[1] }/>
        <img className='w-[50%] m-auto mb-3' src={listing.imgUrls[2] }/>
        <img className='w-[50%] m-auto mb-3' src={listing.imgUrls[3] }/>
        <img className='w-[50%] m-auto mb-3' src={listing.imgUrls[4] }/>
        <img className='w-[50%] m-auto mb-3' src={listing.imgUrls[5] }/>
          <p className='text-2xl font-semibold ml-3 text-center  position:fixed position: bottom-0 text-color-gray-500'>Listing Name: {listing.name}</p>
          <h1 className='text-xl font-semibold ml-3 text-center position: bottom-0'>Address: {listing.address}</h1>
          <p className='text-xl font-semibold ml-3 text-center position: bottom-0'># of Bedrooms: {listing.bedrooms}</p>
          <p className='text-xl font-semibold ml-3 text-center position: bottom-0'># of Bathrooms: {listing.Bathrooms}</p>
          <p></p>
       {/* {listing.} */}
        {/* <button className='bg-blue-500 w-[50%] align-middle ' onClick={contact}>Contact Agent</button> */}
      </main>
  )
}