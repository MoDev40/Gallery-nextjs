"use client"
import { Button } from '@/components/ui/button'
import { ApiURL } from '@/lib/config'
import axios from 'axios'
import { Loader, Upload } from 'lucide-react'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const CreateImage = ({id}:{id:string}) => {
    const [image,setImage] = useState<File|null>()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        if(files && files?.length > 0){
            setImage(files[0])
        }
    }
    
    const handleSubmit = async(e:FormEvent)=>{
      e.preventDefault()
      setIsLoading(true)
      try {
        const formData = new FormData()
        if(image){
          formData.append('image',image)
          formData.append('userId',id)
          await axios.post(`${ApiURL}/api/photos/create`,formData,{
            headers:{'Content-Type':'multipart/form-data'}
          }).then(()=>{
            window.location.reload()
          }).finally(()=>{
            setIsLoading(false)
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
  <form onSubmit={handleSubmit} className="flex items-center">
    <input type="file" name="image" accept="image/*" onChange={handleChange} />
    {image && (
      <Button type="submit" className="p-2" variant="outline">
        {isLoading ? <Loader className="animate-spin" /> : <Upload />}
      </Button>
    )}
  </form>
  )
}

export default CreateImage