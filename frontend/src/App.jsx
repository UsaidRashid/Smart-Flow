import React from 'react'
import Navbar from './Components/Navbar'
import DropImage from './Components/DropImage'

export default function App() {
  return (
    <>
      <Navbar/>
      <div className='absolute top-[7rem] right-[25rem]'>
        <DropImage />
        <div className='flex justify-center'>
                  <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />
              </div>
     </div>
      <div className='absolute top-[7rem] left-[22rem]'>
     <DropImage />
     <div className='flex justify-center'>
                  <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />
              </div>
     </div>
      <div className='absolute top-[29rem] left-[22rem]'>
     <DropImage />
     <div className='flex justify-center'>
                  <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />
              </div>
     </div>
      <div className='absolute top-[29rem] right-[25rem]'>
     <DropImage />
     <div className='flex justify-center'>
                  <img src={`./public/assets/images/stop.png`} alt="" className=' w-1/2 h-20 ' />
              </div>
      </div>
      

    </>
  )
}
