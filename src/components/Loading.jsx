import React from 'react'
import loading from '../assets/svg/loading.svg'

export default function Loading () {
  return (
    <div className='bg-black flex bg-opacity-50 items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
        <div>
            <img src={loading} alt='loading' className=''/>
        </div>
    </div>
  )
}
