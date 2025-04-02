import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Categoria } from "./Categoria";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string 

    @Column()
    descricao?: string 

    @Column()
    preco: number

    @Column()
    quantidade: number

    @CreateDateColumn()
    dataCriacao: Date

    @Column()
    dataAtualizacao?: Date

    @ManyToOne(() => Categoria, { eager: true }) // Mapeia a relação
    @JoinColumn({ name: "categoriaId" }) // Especifica que esse campo armazenará o ID
    categoria: Categoria;


    constructor(nome: string, descricao: string, preco: number, quantidade: number, categoria: Categoria) {
        this.id = 0
        this.nome = nome;
        this.descricao = descricao ?? "";
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.dataCriacao = new Date;
    }
}