"use server"

import {createSafeActionClient} from "next-safe-action";
import {ProductSchema} from "@/types/product-schema";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {products} from "@/server/schema";

const action = createSafeActionClient()

export  const createProduct = action(
    ProductSchema,
    async({description, price, title, id}) => {
        try{

            if(id){
                const currentProduct  =  await db.query.products.findFirst({
                    where:eq(products.id, id)
                })


            if(!currentProduct) return {error:'Product not found '}

            const editedproduct = await db.update(products)
                .set({description, price, title})
                .where(eq(products.id, id))
                .returning()

                return {
                success:`Product ${editedproduct[0].title} has been updated`
                }
            }

            if(!id){
                const newProduct = await db
                    .insert(products)
                    .values({description, price, title})
                    .returning()
            }

        }catch(err){
            return {
                error:JSON.stringify(err)
            }
        }
    }
)