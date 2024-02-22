'use client'
import { Button } from "@/components/ui/button"
import { ResponseType } from "../config/interface"
import { ArrowLeft, ArrowRight, Eye } from "lucide-react"
import useSWR, { Fetcher } from "swr"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import DeletePhoto from "./DeletePhoto"
import Link from "next/link"

const fetcher : Fetcher<any,string> = (url) : Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res) => res.json());

const UserPhotos = ({id}:{id:string}) => {
  const [pageNum,setPageNum] = useState<number>(1)
  const {data,isLoading} = useSWR<ResponseType>(`$/api/photos/find/user-photo/${id}/${pageNum}`,fetcher)
  const handlePrev = ()=>{
    if(pageNum != 1){
      setPageNum((prev)=>prev-1)
    }
  }
  return (
      isLoading ? (
        <SkeletonUserPhotos/>
      ):
    <div className="w-full flex flex-col space-y-6 p-4">
      {data&&
        data.photos.map(photo =>(
          <div key={photo.id} className="flex w-full flex-row justify-between space-x-4">
            <div>
            <img className="w-[50px] h-[50px]" src={photo.url||photo.secure_url} alt="cloudinary/photos"/>
            </div>
            <div className="capitalize space-x-4">
              <span>{photo.resource_type}</span>
              <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-row">
              <Link href={photo.url} target="blank" className="rounded-r-none bg-white p-2"><Eye/></Link>
              <DeletePhoto  data={{public_id:photo.public_id,userId:photo.user_Id,photoId:photo.id}}/>
            </div>
          </div>
        ))
      }
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev}>{pageNum != 1 &&<ArrowLeft/>}</Button>
        <Button variant="outline" onClick={()=>{setPageNum((prev)=>prev+1)}}><ArrowRight/></Button>
      </div>
    </div>
  )
}

export default UserPhotos

export const SkeletonUserPhotos = () => (
  <div>
    {[1, 2, 3, 4].map((index) => (
      <div key={index} className="flex flex-row justify-between space-x-4">
        <div>
          <Skeleton className="animate-pulse bg-gray-300 w-[50px] h-[50px]" />
        </div>
        <div className="flex items-center space-y-2 space-x-4">
          <Skeleton className="animate-pulse bg-gray-300 w-[100px] h-[100px]" />
          <Skeleton className="animate-pulse bg-gray-300 w-[100px] h-[100px]" />
        </div>
        <div className="flex item-center flex-row">
          <Skeleton className="animate-pulse bg-gray-300 rounded-r-none p-2 w-[30px] h-[30px]" />
          <Skeleton className="animate-pulse bg-gray-300 rounded-l-none p-2 w-[30px] h-[30px]" />
        </div>
      </div>
    ))}
  </div>
);
