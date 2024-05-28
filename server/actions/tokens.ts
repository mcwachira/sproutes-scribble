"use server"
import {db} from "@/server";
import {emailVerificationTokens} from "@/server/schema";
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