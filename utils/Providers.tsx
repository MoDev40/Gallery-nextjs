'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
// import { SWRConfig } from 'swr'
const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Providers