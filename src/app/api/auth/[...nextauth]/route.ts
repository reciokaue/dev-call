import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

import { buildNextAuthOptions } from '../../../../lib/auth'

const authOptions = buildNextAuthOptions()

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions)

export { handler as GET, handler as POST }
