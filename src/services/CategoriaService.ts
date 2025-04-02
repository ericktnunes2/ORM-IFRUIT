import { AppDataSource } from "../data-source";
import { Categoria } from "../entities/Categoria";

export class CategoriaService {
    private repository = AppDataSource.getRepository(Categoria);

    async findById(id: number): Promise<Categoria | null> {
        return await this.repository.findOne({ 
            where: { id },
            relations: ["produtos"]
        });
    }

    async create(nome: string, descricao: string): Promise<Categoria> {
        const categoria = new Categoria(nome, descricao);
        return await this.repository.save(categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return await this.repository.find({ relations: ["produtos"] });
    }

    async findByName(nome: string): Promise<Categoria | null> {
        return await this.repository.findOne({ 
            where: { nome },
            relations: ["produtos"]
        });
    }

    async update(id: number, nome: string, descricao: string): Promise<Categoria | null> {
        const categoria = await this.findById(id);
        if (!categoria) return null;

        categoria.nome = nome;
        categoria.descricao = descricao;
        return await this.repository.save(categoria);
    }

    async delete(id: number): Promise<boolean> {
        const categoria = await this.repository.findOne({ 
            where: { id },
            relations: ["produtos"]
        });
        
        if (!categoria) return false;
        if (categoria.produtos && categoria.produtos.length > 0) return false;
        
        await this.repository.remove(categoria);
        return true;
    }
}