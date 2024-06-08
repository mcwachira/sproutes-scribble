import {createSafeActionClient} from "next-safe-action";
import * as Z from 'zod'
import {productVariants} from "@/server/schema";
import {db} from "@/server";
import {z} from "zod";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import algoliasearch from 'algoliasearch'

const action = createSafeActionClient()

const client = algoliasearch(
    process.env.NEXT_PUBLIC_AGOLIA_ID! ,
    process.env.ALGOLIA_ADMIN!
)

const algoliaIndex = client.initIndex("products")

export const deleteVariant = action(
    z.object({id:z.number()}),
    async ({id}) => {

        try{
            const deleteVariant = await db.
            delete(productVariants)
                .where(eq(productVariants.id , id))
                .returning()

            revalidatePath('/dashboard/products')
            algoliaIndex.deleteObject(deleteVariant[0].id.toString())
            return {
                success:`Deleted ${deleteVariant[0].productType}`
            }
        }catch (error){
            return {
                error:"Failed to delete variant"
            }
        }
    }
)