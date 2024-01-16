'use server'

import { getServerSession } from 'next-auth/next'

import { authOptions } from './auth'

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)

    return session?.user
  } catch (err) {
    return {}
  }
}
