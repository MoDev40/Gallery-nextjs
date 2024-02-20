"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { headers } from 'next/headers'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const CreateImage = () => {
    const [image,setImage] = useState<File|null>()

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        if(files && files?.length > 0){
            setImage(files[0])
        }
    }
    
    const handleSubmit = async(e:FormEvent)=>{
      e.preventDefault()
      try {
        const formData = new FormData()
        if(image){
          formData.append('image',image)
          const res = await axios.post('/api/photos/create',formData,{
            headers:{'Content-Type':'multipart/form-data'}
          })
          console.log(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input type="file" name='image' accept="image/*" onChange={handleChange}/>
        {image && (
        <div>
          <p>Selected Image:</p>
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        </div>
      )}
      <div>
        <Button type="submit">Upload</Button>
      </div>
    </form>
    </div>
  )
}

export default CreateImage