import pg from "pg";

const {Client} = pg;


const connectionString = process.env.DATABASE_URL;
export const pgClient = new Client({
    connectionString, ssl: {
        rejectUnauthorized: false
    }
});