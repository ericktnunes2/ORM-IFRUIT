import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

async function connection (){
    const conn = await mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    })

    return conn
}

export default connection