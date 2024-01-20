import React from 'react'
import OauthForm from '../components/Oauth/OauthForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { notFound } from "next/navigation";

const page = () => {
  const session: any = getServerSession(authOptions)
  if(session.user != undefined) {
    notFound();
  }
  return (
    <div>
      <OauthForm />
    </div>
  )
}

export default page