import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from './prisma'

const scopes =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY ?? '',
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const accountScopes = account?.scope?.split(' ')
      const scopesArray = scopes.split(' ')

      const includeScopes =
        accountScopes &&
        scopesArray.every((scope) => accountScopes.includes(scope))

      if (!includeScopes) {
        return 'http://localhost:3000/register/2/connect?error=permissions'
      } else {
        return 'http://localhost:3000/register/2/connect'
      }
    },
  },
}
