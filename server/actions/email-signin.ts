"use server"

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";
import {signIn} from "@/server/auth";
import {AuthError} from "next-auth";

const action = createSafeActionClient()

export const emailSignIn = action (
    LoginSchema,
    async({email, password, code}) => {

        try{
            //check if user is in database
            const existingUser = await db.query.users.findFirst({
                where:eq(users.email, email)
            })


            //check if the email exist or not

            if(existingUser?.email !== email){
                return {error: 'Email not found'}
            }

            //check if the email is verified

            if(!existingUser?.emailVerified){
                const verificationToken = await generateEmailVerificationToken(existingUser?.email)
                await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

                return {
                    success:"Confirmed Email Sent"
                }
            }

            // login in user if email is verified

            await signIn("credentials", {
                email, password, redirectTo:"/"
            })

            return {success:"User Signed In"}
        }catch(error){

            if(error instanceof AuthError){
                switch (error.type){
                    case "CredentialsSignin":
                        return {error:'Email or password incorrect'}
                    case "AccessDenied":
                        return {error:error.message}

                    case "OAuthSignInError":
                        return {error:error.message}

                    default:
                        return {error: "Something went wrong"}
                }
            }

            throw error
        }


    }
)