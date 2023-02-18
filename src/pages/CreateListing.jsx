import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import {getAuth} from 'firebase/auth'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {v4 as uuidv4} from 'uuid'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase'
import {useNavigate} from 'react-router-dom'
export default function () {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({type: 'rent', name: "", bedrooms: 1, bathrooms: 1, parking: false, furnished: false, address: '', description: '', offer: false, regularPrice: 0, discountedPrice: 0, latitude: 0, longitude: 0, images: {} })
    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice, latitude, longitude, images} = formData;
    const [geolocationEnabled, setGeoLocationEnabled] =  useState(true)
    const [loading, setLoading] = useState(false)
    const auth = getAuth()
    
    function onChange(e) {
        let boolean = null;
    if (e.target.value === "true") {
        boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    if (e.target.files) {
      setFormData((prevState) => ({
          ...prevState,
          images: e.target.files
        }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
    }));
}
}
async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    if(+discountedPrice >= +regularPrice){
        setLoading(false)
        toast.error('Discounted price is not less than regular price')
        return
    }
    if(images.length > 6){
        setLoading(false)
        toast.error('No more than 6 images please.')
        return
    }
    let geolocation = {}
    let location;
    if (geolocationEnabled){
        console.log(import.meta)
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY}`);
        const data = await response.json()
        console.log(data)
        geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
        geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

        location = data.status === 'ZERO_RESULTS' && undefined;

        if(location === undefined){
            setLoading(false)
            toast.error('Please enter a valid address')
            return
        }
    }
    else {
        geolocation.lat = latitude
        geolocation.lng = longitude
    }
    
    async function storeImage(image) {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state){
                    case "paused":
                        console.log('Upload is paused');
                        break;

                    case "running":
                        console.log('upload is running')
                        break;
                }
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl)
                    })
                }
            )
        })
    }
    const imgUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
        ).catch((error)=>{
            setLoading(false)
            toast.error('Images not uploaded')
            return
        })
        console.log(imgUrls)

        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timeStamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        }
        delete formDataCopy.images
        !formDataCopy.offer && delete formDataCopy.discountedPrice
        delete formDataCopy.latitude
        delete formDataCopy.longitude
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
        setLoading(false)
        toast.success('Listing created!!!')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
}


if(loading){
  return <Loading/>
}

  return (
<main>
    <h1 className='text-3xl text-center font-semibold'>Create a listing</h1>
    <form onSubmit={onSubmit}> 
        <p>Sell/Rent</p>
        <div className='flex'>
            <button type='button' id='type' value="sale" onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full mr-3 ${type === "rent" ? "bg-white text-black" : "bg-slate-500 text-white" }`}>Sell</button>

            <button type='button' id='type' value="rent" onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${type === "sale" ? "bg-white text-black" : "bg-slate-500 text-white" }`}>Rent</button>
        </div>


        <p className='text-lg mt-3 font-semibold'>Name</p>
        <input type='text' id='name' value={name} onChange={onChange} placeholder='Enter Name'  minLength = '10'required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></input>

        <div className='flex space-x-6 mb-6 '>
            <div>
            <p className='text-md font-semibold'># of Beds</p>
            <input type='number' id='bedrooms' value={bedrooms} onChange={onChange} minLength="1" maxLength='30' required className='px-4 py-2 text-lg text-blue-500 bg-white w-full'     />
            </div>

            <div>
            <p className='text-md font-semibold'># of Baths</p>
            <input type='number' id='bathrooms' value={bathrooms} onChange={onChange} minLength="1" maxLength='30' required className='px-4 py-2 text-lg text-blue-500 bg-white w-full '     />
            </div>
        </div>      
        

        <p>Parking Available?</p>
        <div className='flex mb-6'>
            <button type='button' id='parking' value={true}  onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full mr-3 ${!parking ? "bg-white text-black" : "bg-slate-500 text-white" }`}>YES</button>

            <button type='button' id='parking' value={false} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${parking  ? "bg-white text-black" : "bg-slate-500 text-white" }`}>NO</button>
        </div>



        <p>Is your home furnished?</p>
        <div className='flex'>
            <button type='button' id='furnished' value={true} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full mr-3 ${!furnished ? "bg-white text-black" : "bg-slate-500 text-white" }`}>YES</button>

            <button type='button' id='furnished' value={false} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${furnished ? "bg-white text-black" : "bg-slate-500 text-white" }`}>NO</button>
        </div>


    <p className='text-lg mt-3 font-semibold'>Address</p>
        <textarea type='text' id='address' value={address} onChange={onChange} placeholder='Enter Address'  minLength = '10' required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></textarea>
        {!geolocationEnabled && (
                 <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold'>Latitude</p>
                    <input type='number' id='latitude' value={latitude} onChange={onChange} required min='-90' max='90' className='w-full px-4 py-2 text-xl bg-white border text-center'/>
                </div>

                <div>
                    <p className='text-lg font-semibold'>Longitude</p>
                    <input type='number' id='longitude' value={longitude} onChange={onChange} required min='-180' max='180'className='w-full px-4 py-2 text-xl bg-white border text-center'/>
                </div>
                 </div>

            


        )}



    <p className='text-lg font-semibold'>Description</p>
        <textarea type='text' id='description' value={description} onChange={onChange} placeholder='Add description' minLength = '10'required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></textarea>


     <p>Does your listing have any current offers?</p>
        <div className='flex mb-6 '>
            <button type='button' id='offer' value={true} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full mr-3 ${!offer ? "bg-white text-black" : "bg-slate-500 text-white" }`}>YES</button>

            <button type='button' id='offer' value={false} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${offer ? "bg-white text-black" : "bg-slate-500 text-white" }`}>NO</button>
        </div>



        <div>
            <div className='flex items-center mb-6'>  
                <p className='text-md font-semibold'>Regular Price</p>
                <div className='flex justify-center items-center space-x-6'>
                <input type='number' id='regularPrice' value={regularPrice} onChange={onChange} minLength='1' maxLength='400000000' required className='w-full text-md px-4 py-2 text-blue-500' />
                {type === 'rent' && (
                    <div>
                        <p className='text-md w-full whitespace-nowrap '>$ / Month</p>
                        </div>
                )}
                </div>
            </div>
        </div>



        {offer && (
                  <div>
            <div className='flex items-center mb-6'>  
                <p className='text-md font-semibold'>Discounted Price</p>
                <div className='flex justify-center items-center space-x-6'>
                <input type='number' id='discountedPrice' value={discountedPrice} onChange={onChange} minLength='1' maxLength='400000000' required={offer} className='w-full text-md px-4 py-2 text-blue-500' />
                {type === 'rent' && (
                    <div>
                        <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                        </div>
                )}
                </div>
            </div>
        </div>
        )}

        <div>
            <p className='text:md font-semibold  '>Upload images</p>
            <p>First image is cover image (max 6)</p>
            <input type='file' id='images' onChange={onChange} accept='.jpg, .png, jpeg' multiple required className='w-full px-3 py-1 text-blue-500 bg-white focus:bg-white' />
        </div>

        <button type='submit' className='mt-3 mb-3 w-full px-5 py-2 bg-blue-500 text-white text-semibold rounded shadow-sm hover:bg-blue-600 hover:shadow-md focus:shadow-lg active:bg-blue-700'> Create Listing</button>
    </form>
</main>
  )
}