"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"

const AuthProviderNext = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProviderNext