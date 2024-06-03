"use server"

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {twoFactorTokens, users} from "@/server/schema";
import {
    generateEmailVerificationToken,
    generateTwoFactorToken,
    getTwoFactorTokenByEmail
} from "@/server/actions/tokens";
import {sendTwoFactoTokenByEmail, sendVerificationEmail} from "@/server/actions/email";
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



            //get 2factor token
            if(existingUser.twoFactorEnabled && existingUser.email) {

                console.log(existingUser.email)
                if (code) {
                    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

                    if (!twoFactorToken) {
                        return {error: 'invalid token'}
                    }

                    if (twoFactorToken.token !== code) {
                        return {
                            error: "Invalid token"
                        }
                    }

                    const hasExpired = new Date(twoFactorToken.expires) < new Date()

                    if (hasExpired) {
                        return {
                            error: 'Token has expired'
                        }

                    }

                    await db.delete(twoFactorTokens).where(eq(twoFactorTokens?.id, twoFactorToken.id))
                } else {

                    console.log(existingUser.email, 'email to genetAILIL ')
                    const token = await generateTwoFactorToken(existingUser.email);
                    console.log(token, 'token generated')
                    if (!token) {
                        return {error: 'Token not generated!'}

                    }
                    await sendTwoFactoTokenByEmail(token[0].email, token[0].token)
                    return {twoFactor: "Two factor token sent"}

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