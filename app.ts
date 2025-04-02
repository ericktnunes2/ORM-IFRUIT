import { getConnection, connectToDatabase, testarConexao } from "./db"

const run = async () => {
    try {
        await connectToDatabase(); // Estabelece a conexão com o banco
        console.log("Conexão estabelecida!");
        
        await testarConexao(); // Executa a função de teste
    } catch (error) {
        console.error("Erro durante a execução:", error);
    } finally {
        const conn = getConnection();
        if (conn) {
            await conn.end();
            console.log("Conexão encerrada.");
        }
    }
};

run();