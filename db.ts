import mysql, { Connection } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

let conn: Connection | null = null

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
};

const connectToDatabase = async ()=> {
    try {
        conn = await mysql.createConnection(config);
        console.log('Conectado ao SQL Server com sucesso!');
        return conn;
    } catch (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
    }
}

const getConnection = () => {
  if (!conn) {
      throw new Error("A conexão com o banco de dados não foi inicializada. Chame connectToDatabase() primeiro.");
  }
  return conn;
};

async function testarConexao() {
    try { 
        const conn = getConnection(); // Obtém a conexão já inicializada
        const [rows] = await conn.query("SELECT * FROM frutas");
        console.log(rows);
    } catch (error) {
        console.error("Não foi possível estabelecer a conexão", error);
    }
}

export { connectToDatabase, getConnection, testarConexao }