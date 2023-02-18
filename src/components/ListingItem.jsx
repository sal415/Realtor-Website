import React from 'react'
import { Link } from 'react-router-dom'

export default function ListingItem({listing, id}) {
    console.log('listing item')
    return(
        <li className='flex flex-col justify-between  hover:shadow-lg rounded-md overflow-hidden transition duration-150'>
            <Link to={`/category/${listing.type}/${id}`}>
                <img className=' flex flex-col object-cover hover:scale-100 transition-scale w-[100%] mb-3' src={listing.imgUrls[0]} />
            <div className='bg-gray-300 mb-10 pt-[4%] pb-[4%] pr-[4%] pl-[4%]'> 
            <p className='font-bold'>Listing Name: {listing.name}</p>
            <p className='font-semibold'>Description: {listing.description} </p>

            <p className='font-semibold'>Address: {listing.address}</p>
            <p className='font-bold'>Cost: ${listing.offer? listing.discountedPrice: listing.regularPrice}
            {listing.type === 'rent' && " /month"}
            </p>

            <div className='mb-10'>
                <div>
                <p className='font-semibold'># of Beds: {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : '1 Bed'}</p>
                <p className='font-semibold'># of Baths: {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : '1 Bath'}</p>
                </div>
            </div>
            </div>
            </Link>
            {/* <button className='bg-blue-500'>Contact Agent</button> */}
        </li>
    )
}