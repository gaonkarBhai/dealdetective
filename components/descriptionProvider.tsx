"use client"

import React,{useState} from 'react'
const DescriptionProvider = ({description}:string) => {
   const [readMore,setReadMore] = useState(false)
  return (
    <p className="text-base text-white-300">{
        readMore?
        <>
        {description}
           <div onClick={()=>setReadMore(false)} className="flex text-sm cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
           read less..
         </div>
        </>
         :
         <>
        {description.slice(0, 450)}
        <div onClick={()=>setReadMore(true)} className="flex cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500">
           read more..
         </div>
         </>
        }
        </p>
  )
}

export default DescriptionProvider