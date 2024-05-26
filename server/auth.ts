import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import Facebook from "@auth/core/providers/facebook";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret:process.env.AUTH_SECRET,
    session:{strategy:"jwt"},
    providers: [
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GitHub({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
        }),
        Facebook({
            clientId:process.env.FACEBOOK_CLIENT_ID!,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
})