'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from './auth'

export interface UserProps {
  created_at: Date
  email: string
  emailVerified: string
  id: string
  name: string
  username: string
  avatar_url: string
}

export async function getCurrentUser(): Promise<UserProps | null> {
  try {
    const session = await getServerSession(authOptions)

    return session?.user as UserProps
  } catch (err) {
    return null
  }
}
