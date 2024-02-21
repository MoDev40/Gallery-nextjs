'use client'
import { Button } from "@/components/ui/button"
import { ResponseType } from "../config/interface"
import { Edit,Trash2Icon } from "lucide-react"
import useSWR, { Fetcher } from "swr"
import { useEffect, useState } from "react"

const fetcher : Fetcher<any,string> = (url) : Promise<ResponseType> => fetch(url, { cache: 'no-cache' }).then((res) => res.json());

const UserPhotos = ({id}:{id:string}) => {
  const [pageNum,setPageNum] = useState<number>(1)
  const {data} = useSWR<ResponseType>(`http://localhost:3000/api/photos/find/user-photo/${id}/${pageNum}`,fetcher)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPageNum((prev) => prev + 1);
      }
      if (document.documentElement.scrollTop === 0 && pageNum >= 1) {
        setPageNum((prev) => prev - 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNum]);

  return (
    <div>
      {data?.photos&&
        data.photos.map(image =>(
          <div key={image.id} className="flex flex-row justify-between space-x-4">
            <div>
            <img className="w-[50px] h-[50px]" src={image.url||image.secure_url} alt="cloudinary/images"/>
            </div>
            <div className="capitalize space-x-4">
              <span>{image.resource_type}</span>
              <span>{new Date(image.createdAt).toLocaleDateString()}</span>
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