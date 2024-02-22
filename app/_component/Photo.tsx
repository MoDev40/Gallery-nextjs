'use client'
import { useEffect } from "react"
import { SinglePhoto } from "../config/interface"

const Photo = ({photo}:{photo:SinglePhoto}) => {
  const bg = {
    minHeight: "100%",
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${photo.secure_url||photo.url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }
  useEffect(()=>{

  },[])
  return (
    <div className="md:w-[250px] h-[300px] relative" style={bg}>
      <div className="flex flex-row absolute p-2 capitalize left-0 right-0 bottom-0 justify-between bg-[rgba(0,0,0,0.5)] text-white">
        <span>{photo.resource_type}</span>
        <span>{(photo.createdAt.toString()).split("T")[0]}</span>
      </div>
    </div>
  )
}

export default Photo