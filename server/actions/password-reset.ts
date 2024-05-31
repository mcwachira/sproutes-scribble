"use server"

import {ResetSchema} from "@/types/reset-schema";
import {createSafeActionClient} from "next-safe-action";
import {eq} from "drizzle-orm";
import {db} from "@/server";
import {passwordResetTokens, users} from "@/server/schema";
import {generatePasswordResetToken} from "@/server/actions/tokens";
import {sendPasswordResetEmail} from "@/server/actions/email";


const action = createSafeActionClient()
export const reset = action(ResetSchema, async({email}) => {

    //check for existing user
    const existingUser = await db.query.users.findFirst({
        where:eq(users.email, email )


    })

    if(!existingUser){
        return {error :"Users not found"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    if(!passwordResetToken){
        return {error:"Token not generated"}
    }
    await sendPasswordResetEmail(
        passwordResetToken[0].email,
        passwordResetToken[0].token,
    )

    return {success: 'Reset email sent'}
})