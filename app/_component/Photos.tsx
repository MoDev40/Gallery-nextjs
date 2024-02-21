'use client'
import React, { useEffect, useState } from 'react'
const Photos = () => {
    const [page,setPage] = useState<number>(1)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.offsetHeight){
              setPage((prev)=>prev+1)
            }
        })
    },[])
  return (
    <div className='h-screen'>
    </div>
  )
}

export default Photos