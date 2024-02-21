'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SWRConfig } from 'swr'
const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <SWRConfig>
    <SessionProvider>
        {children}
    </SessionProvider>
    </SWRConfig>
  )
}

export default Providers