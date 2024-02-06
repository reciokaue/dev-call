import dayjs from 'dayjs'
import { google } from 'googleapis'

import { prisma } from './prisma'

export async function getGoogleOauthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider_id: 'google',
      user_id: userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET_KEY,
  )
  const expires_timestamp = account.access_token_expires?.getTime()

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: expires_timestamp,
  })

  const isTokenExpired = dayjs(account.access_token_expires).isBefore(
    new Date(),
  )

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    await prisma.account.update({
      where: { id: account.id },
      data: {
        access_token,
        access_token_expires: expiry_date ? dayjs(expiry_date).format() : null,
        refresh_token,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })
  }

  return auth
}
