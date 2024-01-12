'use server'

import { getServerSession } from 'next-auth/next'

import { buildNextAuthOptions } from './auth'
const authOptions = buildNextAuthOptions()

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)

    return session?.user
  } catch (err) {
    return {}
  }
}
