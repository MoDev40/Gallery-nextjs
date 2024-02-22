'use client'
import React, { useEffect, useRef, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { ResponseType, SinglePhoto } from '../config/interface';
import Photo from './Photo';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
const fetcher: Fetcher<any, string> = (url): Promise<ResponseType> =>
  fetch(url,{cache:"no-cache"}).then((res) => res.json());

const Photos = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const {data:user} = useSession()
  const router = useRouter()
  const { data, isLoading } = useSWR<ResponseType>(
    `http://localhost:3000/api/photos/find/all/${pageNum}`,
    fetcher
  );

  const handlePrev = ()=>{
    if(pageNum != 1){
      setPageNum((prev)=>prev-1)
    }
  }
  if(!user?.user) return <div></div>
  return (
    <div className='flex flex-col space-y-6'>
      {isLoading ? (
        <SkeletonPhotos/>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {data &&
            data.photos.map((photo, index) => (
              <Photo key={index} photo={photo} />
            ))}
        </div>
      )}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev}>{pageNum != 1 &&<ArrowLeft/>}</Button>
        <Button variant="outline" onClick={()=>{setPageNum((prev)=>prev+1)}}><ArrowRight/></Button>
      </div>
    </div>
  );
};

export default Photos;

export const SkeletonPhotos = ()=>{
  return <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
  {Array.from({ length: 6 }).map((_, index) => (
    <Skeleton
      key={index}
      className='md:w-[300px] h-[350px] relative animate-pulse bg-gray-300'
    />
  ))}
</div>
}