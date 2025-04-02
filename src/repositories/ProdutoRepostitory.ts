import { AppDataSource } from "../data-source";
import { Produto } from "../entities/Produto";
import { Categoria } from "../entities/Categoria";
import { CategoriaRepository } from "./CategoriaRepository";

export class ProdutoRepository {
    private repository = AppDataSource.getRepository(Produto);
    private categoriaRepository = new CategoriaRepository();

    async create(
        nome: string,
        descricao: string,
        preco: number,
        quantidade: number,
        categoriaId: number
    ): Promise<Produto | null> {
        const categoria = await this.categoriaRepository.findById(categoriaId);
        if (!categoria) return null;

        const produto = new Produto(nome, descricao, preco, quantidade, categoria);
        return await this.repository.save(produto);
    }

    async findAll(): Promise<Produto[]> {
        return await this.repository.find({ relations: ["categoria"] });
    }

    async findById(id: number): Promise<Produto | null> {
        return await this.repository.findOne({ 
            where: { id },
            relations: ["categoria"]
        });
    }

    async findByName(nome: string): Promise<Produto[]> {
        return await this.repository.find({ 
            where: { nome },
            relations: ["categoria"]
        });
    }

    async findByCategory(categoriaId: number): Promise<Produto[]> {
        return await this.repository.find({ 
            where: { categoria: { id: categoriaId } },
            relations: ["categoria"]
        });
    }

    async update(
        id: number,
        nome: string,
        descricao: string,
        preco: number,
        quantidade: number,
        categoriaId: number
    ): Promise<Produto | null> {
        const produto = await this.findById(id);
        if (!produto) return null;

        const categoria = await this.categoriaRepository.findById(categoriaId);
        if (!categoria) return null;

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.quantidade = quantidade;
        produto.categoria = categoria;
        produto.dataAtualizacao = new Date();

        return await this.repository.save(produto);
    }

    async delete(id: number): Promise<boolean> {
        const produto = await this.findById(id);
        if (!produto) return false;
        
        await this.repository.remove(produto);
        return true;
    }
}