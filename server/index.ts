import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.POSTGRES_URL as string);
const db = drizzle(sql);

// const result = await db.select().from(...);