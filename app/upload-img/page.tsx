import React from 'react'
import CreateImage from '../_component/CreateImage'
import { ResponseType } from '../config/interface'
import { getUserSession } from '@/lib/session'
import UserPhotos from '../_component/UserPhotos'

type Param = {
  id:string,
  pageNum:number
}

async function getData({id,pageNum}:Param) {
  const res = await fetch(`http://localhost:3000/api/photos/find/user-photo/${id}/${pageNum}`,{cache:"no-cache"})
  return res.json()
}

const UploadPage = async() => {
  const session = await getUserSession()
  // const {photos}:ResponseType = await getData({id:session.id,pageNum:2})
  return (
    <div className='mt-8 space-y-8 md:p-6 h-screen'>
        <CreateImage id={session.id}/>
        <UserPhotos id={session.id}/>
    </div>
  )
}

export default UploadPage