"use server"
import {createSafeActionClient}  from "next-safe-action";
import {RegisterSchema} from "@/types/register-schema";
import bcrypt from 'bcrypt'
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";



//lambda function
const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async ({
    email, name, password
}) => {

    //hashing password
    const hashedPassword = await bcrypt.hash(password,10)


    //check if existing user
    const existingUser = await db.query.users.findFirst({
        where:eq(users.email, email)
    })

    //check if email exist
    //check if email is verified
    //if it exist and is not verified send verification


    if(existingUser){

        if(!existingUser.emailVerified){

            const verificationToken = await generateEmailVerificationToken(email)

            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token )

            return {
              success:"Email Confirmation resent"
            }
        }
        return {error: 'email already in use'}
    }

    //Logic for when a user is not registered

    await db.insert(users).values({
        email,
        name,
        password:hashedPassword
    })

    const verificationToken = await  generateEmailVerificationToken(email)

    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token )


    return {
        success:"Email Confirmation sent"
    }
})
