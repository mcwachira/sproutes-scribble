"use server"

import {createSafeActionClient} from "next-safe-action";
import {reviewSchema} from "@/types/review-schema";
import {auth} from "@/server/auth";
import {db} from "@/server";
import {and, eq} from "drizzle-orm";
import {reviews} from "@/server/schema";
import {revalidatePath} from "next/cache";

const action = createSafeActionClient()

export const  addReview  = action(reviewSchema, async({
    productID, rating, comment
}) => {

    try{
        //first check and see if the user is assign in
        const session = await auth()

        if(!session) return{error:'Please sign in to review'}

        const reviewExists = await db.query.reviews.findFirst({
            where: and(
                eq(reviews.productID, productID),
                eq(reviews.userID, session.user.id)
            ),
        })

        if(reviewExists) return{
                error:"You have already reviewed this product"
            }


        const newReview = await db.insert(reviews).values({
            productID ,
            rating,
            comment,
            userID: session.user.id,

        }).returning()

        revalidatePath(`/products/${productID}`)

        return {
            success:newReview[0]
        }
    }catch(error){

        return{
            error:JSON.stringify(error)
        }
    }
})