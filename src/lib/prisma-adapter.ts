import { cookies } from 'next/headers'
import { Adapter } from 'next-auth/adapters'

import { prisma } from './prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const userCookie = cookies().get('@dev.call:userId')

      if (!userCookie) throw new Error('User ID not found on cookies')
      const userIdOnCookies = userCookie.value

      const prismaUser = await prisma.user.update({
        where: { id: userIdOnCookies },
        data: {
          email: user.email!,
          name: user.name,
          avatar_url: user.avatar_url!,
        },
      })

      cookies().delete('@dev.call:userId')

      return {
        created_at: prismaUser.created_at,
        email: prismaUser.email!,
        emailVerified: null,
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        avatar_url: prismaUser.avatar_url!,
      }
    },
    async getUser(id) {
      console.log('getUser')
      const user = await prisma.user.findUnique({
        where: { id },
      })
      if (!user) return null

      return {
        created_at: user.created_at,
        email: user.email!,
        emailVerified: null,
        id: user.id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
      }
    },
    async getUserByEmail(email) {
      console.log('getUserByEmail')
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) return null

      return {
        created_at: user.created_at,
        email: user.email!,
        emailVerified: null,
        id: user.id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url!,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      console.log('getUserByAccount')
      const account = await prisma.account.findUnique({
        where: {
          provider_id_provider_account_id: {
            provider_account_id: providerAccountId,
            provider_id: provider,
          },
        },
        include: {
          user: true,
        },
      })
      if (!account) return null

      return {
        created_at: account.user.created_at,
        email: account.user.email!,
        emailVerified: null,
        id: account.user.id,
        name: account.user.name,
        username: account.user.username,
        avatar_url: account.user.avatar_url!,
      }
    },
    async updateUser(user) {
      console.log('updateUser')
      const newUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email: user.email!,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url!,
        },
      })

      return {
        created_at: newUser.created_at,
        email: newUser.email!,
        emailVerified: null,
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        avatar_url: newUser.avatar_url!,
      }
    },
    async linkAccount(account) {
      console.log('linkAccount')
      await prisma.account.create({
        data: {
          user_id: account.userId,
          provider_type: account.type,
          provider_id: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          access_token_expires: account.expires_at
            ? new Date(account.expires_at)
            : new Date(),
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log('createSession')
      await prisma.session.create({
        data: {
          expires,
          session_token: sessionToken,
          user_id: userId,
        },
      })

      return { sessionToken, userId, expires }
    },
    async getSessionAndUser(sessionToken) {
      console.log('getSessionAndUser')
      const prismaSession = await prisma.session.findUnique({
        where: { session_token: sessionToken },
        include: { user: true },
      })

      if (!prismaSession) return null

      const { user, ...session } = prismaSession
      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.id,
        },
        user: {
          created_at: user.created_at,
          email: user.email!,
          emailVerified: null,
          id: user.id,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url!,
        },
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
      console.log('updateSession')
      const session = await prisma.session.update({
        where: {
          id: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.id,
      }
    },
    async deleteSession(sessionToken) {
      console.log('deleteSession')
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
    // async deleteUser(userId) {},
    // async unlinkAccount({ providerAccountId, provider }) {},

    // async createVerificationToken({ identifier, expires, token }) {},
    // async useVerificationToken({ identifier, token }) {},
  }
}
