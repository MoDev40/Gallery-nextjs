import React from 'react'
import CreateImage from '../_component/CreateImage'
import { getUserSession } from '@/lib/session'
import UserPhotos from '../_component/UserPhotos'


const UploadPage = async() => {
  const session = await getUserSession()
  return (
    <div className=' w-full md:w-[1120px] md:mx-auto p-4 flex flex-col space-y-4 md:p-6 '>
        <CreateImage id={session.id}/>
        <UserPhotos id={session.id}/>
    </div>
  )
}

export default UploadPage