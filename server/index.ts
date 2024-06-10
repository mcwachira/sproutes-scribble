import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "@/server/schema"



//why am i able to access i the browser
const dataString =process.env.NEXT_PUBLIC_POSTGRES_URL!
const sql = neon(dataString)
export const db = drizzle(sql, { schema, logger: true })