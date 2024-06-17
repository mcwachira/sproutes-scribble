// noinspection UnnecessaryLocalVariableJS

"use server"
import {db} from "@/server";
import {emailVerificationTokens, passwordResetTokens, twoFactorTokens, users} from "@/server/schema";
import {eq} from "drizzle-orm";
import crypto from 'crypto'


//check if token exist
export const getVerificationTokenByEmail = async (email:string) => {
    try{
        const verificationToken = await  db.query.emailVerificationTokens.findFirst({

            //getting the token corresponding to the email

            //emailVerificationTokens.token
            //console.log(emailVerificationTokens.token)
            where : eq(emailVerificationTokens.token, email)
        })

        return verificationToken
    }catch(error) {
        return null
    }
}


//generate a new token
export const generateEmailVerificationToken = async(email:string) => {

    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken  = await getVerificationTokenByEmail(email)

if(existingToken){
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, existingToken.id))
}

const verificationToken =  await db.insert(emailVerificationTokens).values({
    email,
    token,
    expires,
}).returning()

    return verificationToken
}

export const newVerification = async (token: string | null) => {

    //checking if token exist
    const existingToken = await getVerificationTokenByEmail(token)

    if(!existingToken) return {error:'Token not found'}


    // Checking if its expired
    const hasExpired =  new Date(existingToken.expires) < new Date()

    if(hasExpired) return {error: 'Token has expired'}



    //checking if user exist based on the token
    const existingUser  = await db.query.users.findFirst({
        where:eq(users.email, existingToken.email)
    })

    if(!existingUser) return {error:'email does not exist'}

    await db.update(users).set({
        emailVerified: new Date(),

    })


    //if token verified delete the users token after verification
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, existingToken.id))

    return {success: 'Email verified'}
}



export const getPasswordResetByToken = async(token:string) => {
    try{

        const passwordRestToken = await db.query.passwordResetTokens.findFirst({

            where:eq(passwordResetTokens.token, token)
        })

        return passwordRestToken
    }catch(error){
        return null
        }
    }

    export const  generatePasswordResetTokenByEmail =  async(email:string)=> {

    try{

    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
        where:eq(passwordResetTokens.email, email)
    })

        return passwordResetToken
    }catch(error){
        return null
    }
    }
    export const generatePasswordResetToken= async (email:string)=> {

        try {
            const token = crypto.randomUUID();

            //hour expiry
            const expires = new Date(new Date().getTime() + 3600 * 1000)

            //check if the token exist

            const existingToken = await generatePasswordResetTokenByEmail(email)
            if (existingToken) {
                await db.delete(passwordResetTokens)
                    .where(eq(passwordResetTokens.id, existingToken.id))
            }

            const passwordResetToken = await db.insert(passwordResetTokens).values({
                email,
                token,
                expires
            }).returning()


            return passwordResetToken
        } catch (error) {
            return null
        }

    }

    export const getTwoFactorTokenByEmail = async(email:string) => {

    try{
        const twoFactorToken= await db.query.twoFactorTokens.findFirst({
            where:eq(twoFactorTokens.email , email)
        })

        return twoFactorToken
    }catch {
        return null
        }
    }

export const getTwoFactorTokenByToken = async(token:string) => {
    try{

        const twoFactorToken= await db.query.twoFactorTokens.findFirst({

            where:eq(twoFactorTokens.token, token)
        })

        return twoFactorToken
    }catch(error){
        return null
    }
}

export const generateTwoFactorToken= async (email:string)=> {

    try {
        const token = crypto.randomInt(100_000, 1_000_000).toString();

        //hour expiry
        const expires = new Date(new Date().getTime() + 3600 * 1000)

        //check if the token exist

        const existingToken = await getTwoFactorTokenByEmail(email)
        if (existingToken) {
            await db.delete(twoFactorTokens)
                .where(eq(twoFactorTokens.id, existingToken.id))
        }

        const twoFactorToken = await db.insert(twoFactorTokens).values({
            email,
            token,
            expires
        }).returning()


        return twoFactorToken
    } catch (error) {
        return null
    }

}
