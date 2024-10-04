import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = ( {setToken}) => {
  return (
    <div className=' flex justify-between items-center py-2 px-[5%]'>
        <img className='w-28' src={assets.logo} alt="" />
        <button onClick={() => setToken("")} className='px-5 py-2 text-xs text-white bg-gray-600 rounded-full sm:px-7 sm:py-2 sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar