'use client'
import { Button } from "@/components/ui/button"
import { ResponseType, SinglePhoto } from "../config/interface"
import { Edit,Trash2Icon } from "lucide-react"
import useSWR, { Fetcher } from "swr"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher : Fetcher<any,string> = (url) : Promise<ResponseType> => fetch(url, { cache: 'no-cache' }).then((res) => res.json());

const UserPhotos = ({id}:{id:string}) => {
  const [pageNum,setPageNum] = useState<number>(1)
  const [photos,setPhotos] = useState<SinglePhoto[]>()

  const {data,isLoading} = useSWR<ResponseType>(`http://localhost:3000/api/photos/find/user-photo/${id}/${pageNum}`,fetcher)
  
  useEffect(() => {
    if (data && data.photos) {
      setPhotos((prevPhotos) => [...(prevPhotos||[]), ...data.photos]);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop === clientHeight) {
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  return (
      isLoading ? (
        <SkeletonPhotos/>
      ):
      <div className="h-screen">
      {photos&&
        photos.map(photo =>(
          <div key={photo.id} className="flex flex-row justify-between space-x-4">
            <div>
            <img className="w-[50px] h-[50px]" src={photo.url||photo.secure_url} alt="cloudinary/photos"/>
            </div>
            <div className="capitalize space-x-4">
              <span>{photo.resource_type}</span>
              <span>{new Date(photo.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-row">
              <Button className="rounded-r-none p-2" variant="outline"><Edit/></Button>
              <Button className="rounded-l-none p-2" variant="destructive"><Trash2Icon/></Button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default UserPhotos

export const SkeletonPhotos = () => (
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
