import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials"
import {LoginSchema} from "@/types/login-schema";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret:process.env.AUTH_SECRET,
    session:{strategy:"jwt"},
    providers: [
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking:true,
        }),

        GitHub({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking:true,
        }),
        Facebook({
            clientId:process.env.FACEBOOK_CLIENT_ID!,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking:true,
        }),

        Credentials({
            authorize:async(credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials)
                console.log('validate', validatedFields)

                if(validatedFields.success){

                    const {email, password} = validatedFields.data;

                    const user = await db.query.users.findFirst({
                        where:eq(users.email, email)
                    })

                    //check if user exist
                    if(!user || !user.password) return;

                    const passwordMatch= await  bcrypt.compare(password, user.password)

                    if(passwordMatch)  return user


                }

                return null
            }
        })
    ],
})