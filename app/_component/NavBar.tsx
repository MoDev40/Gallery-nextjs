'use client'
import { Button } from '@/components/ui/button'
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
    <div className='flex flex-row justify-between p-4 items-center'>
        <div>
        <Link href="/">
            <Button variant="outline">Gallery</Button>
        </Link>
        </div>
        <div className='space-x-3'>
        { data?.user?
        (
            <div className='space-x-2'>
                <Link href="/photos">
                    <Button className='rounded-sm' variant="outline">Album</Button>
                </Link>
                <Link href="/upload">
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