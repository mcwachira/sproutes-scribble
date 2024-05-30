"use server"
import {db} from "@/server";
import {emailVerificationTokens, users} from "@/server/schema";
import {eq} from "drizzle-orm";


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

export const newVerification = async(token:string) => {

    //checking if token exist
    const existingToken = await getVerificationTokenByEmail(token)

    if(!existingToken) return {error:'Token not found'}


    // Checking if its expired
    const hasExpired =  new Date(existingToken.expires) < new Date()

    if(hasExpired) return {error: 'Token has expired'}



    //checking if user exist based onb the token
    const existingUser  = await db.query.users.findFirst({
        where:eq(users.email, existingToken.email)
    })

    if(!existingUser) return {error:'email does not exist'}

    await db.update(users).set({
        emailVerified: new Date(),
        email:existingToken.email
    })


    //if token verified delete the users token after verification
    await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, existingToken.id))

    return {success: 'Email verified'}
}