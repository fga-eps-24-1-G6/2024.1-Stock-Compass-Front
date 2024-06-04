import { auth } from '@clerk/nextjs/server'

export default async function Layout({ children }:{ children: React.ReactNode }){
  auth().protect()

  return <>{children}</>
}