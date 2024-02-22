import React from 'react'
import CreateImage from '../_component/CreateImage'
import { getUserSession } from '@/lib/session'
import UserPhotos from '../_component/UserPhotos'

export const dynamic = 'force-dynamic'

const UploadPage = async() => {
  const session = await getUserSession()
  return (
    <div className=' w-full lg:w-[1120px] space-y-10 mt-5  lg:mx-auto p-4 flex flex-col md:space-y-4 md:p-6 '>
        <CreateImage id={session.id}/>
        <UserPhotos id={session.id}/>
    </div>
  )
}

export default UploadPage