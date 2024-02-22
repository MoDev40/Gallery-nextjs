'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loader, Trash2Icon } from 'lucide-react'
import React, { FC, useState } from 'react'

export type TypeData = {
    public_id:string;
    userId:string;
    photoId:string;
}

type Props = {
    data:TypeData,
}

const DeletePhoto:FC<Props> = ({data}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleDelete = async ()=>{
        setIsLoading(true)
        await axios.delete(`/api/photos/delete`,{data})
        .then(()=>{window.location.reload()})
        .catch(()=>{})
        .finally(()=>{ 
            setIsLoading(false)
        })
    }
  return (
    <Button onClick={handleDelete} className="rounded-l-none p-2" variant="destructive">{isLoading ? <Loader className='animate-spin'/> : <Trash2Icon/>}</Button>
    )
}

export default DeletePhoto