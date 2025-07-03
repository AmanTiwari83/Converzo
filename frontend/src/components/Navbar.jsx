import React, { useState } from 'react'
import Home from '../pages/Home'
import HomeOptions from './HomeOptions'

const Navbar = ({handleOptions , showOptions}) => {
  
  return (
  <>
   <div className='w-full flex  justify-between items-center bg-green-800 text-white text-2xl font-semibold px-6 py-3'>
        <h5 className=''>Converzo</h5>
        <h6
        onClick={()=>handleOptions()}
        >:</h6>
    </div>
    {showOptions && (
      <HomeOptions/>
    )}
  </>
  )
}

export default Navbar