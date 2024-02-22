'use client'
import React, { useEffect, useRef, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { ResponseType, SinglePhoto } from '../config/interface';
import Photo from './Photo';
import { Skeleton } from '@/components/ui/skeleton';

const fetcher: Fetcher<any, string> = (url): Promise<ResponseType> =>
  fetch(url, { cache: 'no-cache' }).then((res) => res.json());

const Photos = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [photos, setPhotos] = useState<SinglePhoto[]>();
  const { data, isLoading } = useSWR<ResponseType>(
    `http://localhost:3000/api/photos/find/all/${pageNum}`,
    fetcher
  );

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
    <div className='p-4'>
      {isLoading ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className='md:w-[300px] h-[350px] relative animate-pulse bg-gray-300'
            />
          ))}
        </div>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {photos &&
            photos.map((photo, index) => (
              <Photo key={index} photo={photo} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Photos;