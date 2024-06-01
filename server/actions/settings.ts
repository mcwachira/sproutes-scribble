'use server'

import {createSafeActionClient} from "next-safe-action";
import {SettingsSchema} from "@/types/settings-schema";
import {auth} from "@/server/auth";
import {db} from "@/server";
import {users} from "@/server/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {revalidatePath} from "next/cache";

const action =  createSafeActionClient()

export const Settings =action(SettingsSchema, async(values) => {

    //check if user  is sign in or user session exist
    const user =  await auth()

    if(!user){
        return {
            error:"User not found"
        }
    }

    //check if user exist in db

    const dbUser = await db.query.users.findFirst({
        where:eq(users.id, user.user.id)
    })

    if(!dbUser){
        return {error:"User not found"}
    }


    if(user.user.isOAuth){
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined


    }


    if(values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
        if (!passwordMatch) {
            return {
                error: 'Password do not match'
            }
        }

        const samePassword = await bcrypt.compare(values.newPassword, dbUser.password)

        //check if the password is the same as the old one
        if (samePassword) {
            return {
                error: "New Password is the same as the old"
            }
        }
        const hashedPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashedPassword
        values.newPassword = undefined

    }
                const updateUser= await db.update(users).set({

                    name:values.name,
                    password: values.password,
                    email:values.email,
                    image:values.image
                }).where(eq(users.id, dbUser.id))
        revalidatePath("/dashboard/settings")

        return {success: "settings updated"}


})