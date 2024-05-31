"use server"

import {createSafeActionClient} from "next-safe-action";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {passwordResetTokens, users} from "@/server/schema";
import {generateEmailVerificationToken, getPasswordResetByToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";
import {signIn} from "@/server/auth";
import {AuthError} from "next-auth";
import {NewPasswordSchema} from "@/types/new-password-schema";
import bcrypt from "bcrypt";
import {Pool} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-serverless";

const action = createSafeActionClient()

export const newPassword = action (
    NewPasswordSchema,
    async({password, token}) => {

        //using web sockets tro perform transactions
const pool = new Pool ({connectionString :process.env.POSTGRES_URL})
        const dbPool = drizzle(pool)
        try{

            //check if token exist
            if(!token){
                return {error: "Missing Token"}
            }
            //check if token is valid
            const existingToken = await getPasswordResetByToken(token)

            if(!existingToken){
                return {error:"Token not found"}
            }


            //check if token is expired

            const hasExpired =  new Date(existingToken.expires) < new Date();

            if(hasExpired){

                return {
                    error:"Token has expired"
                }
            }



            //checking if user exist based on the token
            const existingUser  = await db.query.users.findFirst({
                where:eq(users.email, existingToken.email)
            })

            //check if user exist
            if(!existingUser){
                return {
                    error:"user does not exist"
                }
            }

            //hash the password

            const hashedPassword = await bcrypt.hash(password, 10)

            await dbPool.transaction(async(tx) => {
                await tx.update(users).set({
                    password:hashedPassword,
                }).where(eq(users.id, existingUser.id))

                //delete token
                await tx.delete(passwordResetTokens)
                    .where(eq(passwordResetTokens.id, existingToken.id))
            })

            return {success: "Password Updated"}

        }catch(error){
            console.log(error)
        }


    }
)