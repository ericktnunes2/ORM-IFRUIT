import { DataSource } from "typeorm";
import { Categoria } from "./entities/Categoria";
import { Produto } from "./entities/Produto";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost", // ou seu host do MySQL
    port: 3306, // porta padrão do MySQL
    username: "root", // substitua pelo seu usuário
    password: "c@tolic@", // substitua pela sua senha
    database: "ifruit", // nome do banco de dados
    synchronize: true, // cuidado em produção! deve ser false em produção
    logging: true,
    entities: [Categoria, Produto],
    subscribers: [],
    migrations: [],
});