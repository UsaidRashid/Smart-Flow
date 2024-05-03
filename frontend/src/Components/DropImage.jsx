import React, { useState } from 'react'

export default function DropImage() {
    let [pic,setpic]=useState('')
    function getFile(e){
        let name = e.target.name
        let value = e.target.files[0].name
        console.log(value)
        // console.log(value)
        setpic(value)
      }
  return (
    <>
    
      <div >
    <div className="extraOutline p-4 bg-[#1F3139] bg-opacity-85 w-max bg-whtie m-auto rounded-lg">
              <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{ width: "221px" }}>
                  <div>
            <svg className="text-indigo-500 w-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                    <input className="text-sm cursor-pointer w-36 hidden" type="file" onChange={getFile} multiple />
                      { pic?<img src={`./public/assets/images/${pic}`} alt="" className=' h-[100%] w-[100%] absolute bottom-[2px] right-0 z-10' />:""}
                    <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                </label>

                <div className="title text-indigo-500 uppercase">or drop files here</div>
                      </div>
                      </div>
        </div>
              </div>
              
</div>
    </>
 
  )
}
