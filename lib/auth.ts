import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db/db"
import GitHub from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "./server/utils";
import type { Provider } from "next-auth/providers"
import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})


const providers: Provider[] = [
  Credentials({
    credentials: { email: {}, password: {} },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
  GitHub,
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers,
  pages: {
    signIn: "/signin",
  },
})


// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [GitHub, Credentials({
//     credentials: {
//       email: {},
//       password: {},
//     },
//     authorize: async (credentials) => {
//       try {
//         let user = null

//         const { email, password } = await signInSchema.parseAsync(credentials)

//         // logic to salt and hash password
//         const pwHash = saltAndHashPassword(password)

//         // logic to verify if the user exists
//         user = await getUserFromDb(email, pwHash)

//         if (!user) {
//           throw new Error("User not found.")
//         }

//         // return JSON object with the user data
//         return user
//       } catch (error) {
//         if (error instanceof ZodError) {
//           // Return `null` to indicate that the credentials are invalid
//           return null
//         }
//       }
//     },
//   }),],
// })

// import NextAuth, { AuthError, CredentialsSignin, User } from 'next-auth';
// import GitHub from 'next-auth/providers/github';
// import Credentials from "next-auth/providers/credentials"
// import { getUser } from './db/schema';
// import { object, string, ZodError } from 'zod';
// import { saltAndHashPassword } from '@/lib/server/utils';
// import { signInSchema } from './utils';


// class NotfoundError extends CredentialsSignin {
//   code = "User not found"
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub, Credentials({
//     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         username: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         try {
//           let user = null
 
//           const { username, password } = await signInSchema.parseAsync(credentials)
 
//           // logic to salt and hash password
//           const pwHash = await saltAndHashPassword(password)
 
//           // logic to verify if the user exists
//           user = await getUser(username, pwHash)
 
//           if (!user) {
//             throw new Error("User not found.")
//           }
 
//           // return JSON object with the user data
//           return {
//             id: user.id.toString(),
//             username: user.username,
//             role: user.role,
//           }
//         } catch (error) {
//           // if (error instanceof ZodError) {
//           //   // Return `null` to indicate that the credentials are invalid
//           //   return null
//           // }
//           return null
//         }
//       },
//   })],
  
// });


