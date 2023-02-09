import React, { useState } from 'react'

export default function () {
    const [formData, setFormData] = useState({type: 'rent', name: "", bedrooms: 1, bathrooms: 1, parking: false, furnished: false, address: '', description: '', offer: false, regularPrice: 0, discountedPrice: 0})
    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice} = formData;


    function onChange(){
    }

  return (
<main>
    <h1 className='text-3xl text-center font-semibold'>Create a listing</h1>
    <form>
        <p>Sell/Rent</p>
        <div className='flex'>
            <button type='button' id='type' value="sale" onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full mr-3 ${type === "rent" ? "bg-white text-black" : "bg-slate-500 text-white" }`}>Sell</button>

            <button type='button' id='type' value="sale" onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${type === "sale" ? "bg-white text-black" : "bg-slate-500 text-white" }`}>Rent</button>
        </div>


        <p className='text-lg mt-3 font-semibold'>Name</p>
        <input type='text' id='name' value={name} onChange={onChange} placeholder='Enter Name' maxLength = '32' minLength = '10'required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></input>

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

            <button type='button' id='type' value={false} onClick={onChange} className={`px-7 py-3 font-medium shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg w-full ml-3 ${furnished ? "bg-white text-black" : "bg-slate-500 text-white" }`}>NO</button>
        </div>


    <p className='text-lg mt-3 font-semibold'>Address</p>
        <textarea type='text' id='address' value={address} onChange={onChange} placeholder='Enter Address' maxLength = '32' minLength = '10'required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></textarea>

    <p className='text-lg font-semibold'>Description</p>
        <textarea type='text' id='description' value={description} onChange={onChange} placeholder='Add description' maxLength = '32' minLength = '10'required className='w-full px-4 py-2 text-lg text-bl focus:text-gray-700 focus:bg-white focus:border-slate-500 mb-6 '></textarea>


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