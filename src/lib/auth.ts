import { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from './prisma-adapter'

const scopes =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY ?? '',
      authorization: {
        params: {
          scope: scopes,
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const accountScopes = account?.scope?.split(' ')
      const scopesArray = scopes.split(' ')
      console.log('signin')

      const includeScopes =
        accountScopes &&
        scopesArray.every((scope) => accountScopes.includes(scope))

      if (!includeScopes) {
        return 'http://localhost:3000/register/2/connect?error=permissions'
      } else {
        // return 'http://localhost:3000/register/2/connect'
        return true
      }
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
}
