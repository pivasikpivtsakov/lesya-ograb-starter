import pg from "pg";

const {Pool} = pg;


const connectionString = process.env.DATABASE_URL;
export const pgPool = new Pool({
    connectionString, ssl: {
        rejectUnauthorized: false
    }
});