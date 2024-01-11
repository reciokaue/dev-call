import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const scopes =
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
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

      console.log('Result', !includeScopes)

      if (!includeScopes) {
        return 'http://localhost:3000/register/2/connect?error=permissions'
      } else {
        return 'http://localhost:3000/register/2/connect'
      }
    },
  },
}
