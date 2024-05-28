"use server"

import {createSafeActionClient} from "next-safe-action";
import {LoginSchema} from "@/types/login-schema";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

const action = createSafeActionClient()

export const emailSignIn = action (
    LoginSchema,
    async({email, password, code}) => {
        //check if user is in database
        const existingUser = await db.query.users.findFirst({
            where:eq(users.email, email)
        })


        if(existingUser?.email !== email){
            return {error: 'Email not found'}
        }
        return {success:email}
    }
)