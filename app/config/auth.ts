import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/lib/client'

const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET!

export const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          avatar:profile.image
        },
        update: {
            name: profile.name,
            avatar:profile.image
        },
      })
      return true
    },
    session,
    async jwt({ token, profile }) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        })
        if (!user) {
          throw new Error('No user found')
        }
        token.id = user.id
      }
      return token
    },
  },
}