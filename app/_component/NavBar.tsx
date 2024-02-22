'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const {data} = useSession()

    const handleSignIn = async()=>{
        await signIn("google")
    }
    const handleSignOut = async()=>{
        await signOut()
    }

  return (
    <div className='w-full md:w-[1120px] md:mx-auto p-4 flex flex-row justify-between items-center'>
        <div>
        <Link href="/">
            <Button variant="outline">Gallery</Button>
        </Link>
        </div>
        <div className='space-x-3'>
        { data?.user?
        (   
            <div className='space-x-2'>
                <Link href="/upload-img">
                    <Button className='rounded-sm' variant="outline">Upload</Button>
                </Link>
                <Button onClick={handleSignOut} className='rounded-md' variant="destructive">Log out</Button>
            </div>
        ):
        (
            <Button onClick={handleSignIn} className='rounded-sm' variant="outline">Sign in with google</Button>
        )
        }
        </div>
    </div>
  )
}

export default NavBar

export const SkeletonNavs = () => {
  return (
    <div className='w-full md:w-[1120px] md:mx-auto p-4 flex flex-row justify-between items-center'>
      <div>
          <Button variant='outline'>
            <Skeleton className='w-[80px] h-[32px]' />
          </Button>
      </div>
      <div className='space-x-3'>
        <Button className='rounded-sm' variant='outline'>
          <Skeleton className='w-[152px] h-[32px]' />
        </Button>
      </div>
    </div>
  );
};