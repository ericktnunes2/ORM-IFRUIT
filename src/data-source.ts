import { DataSource } from "typeorm";
import { Categoria } from "./entities/Categoria";
import { Produto } from "./entities/Produto";
import dotenv from "dotenv";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST, // ou seu host do MySQL
    port: Number(process.env.DB_PORT), // porta padrão do MySQL
    username: process.env.DB_USER, // substitua pelo seu usuário
    password: process.env.DB_PASSWORD, // substitua pela sua senha
    database: process.env.DB_DATABASE, // nome do banco de dados
    synchronize: true, // cuidado em produção! deve ser false em produção
    logging: true,
    entities: [Categoria, Produto],
    subscribers: [],
    migrations: [],
});