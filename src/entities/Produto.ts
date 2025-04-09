import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Categoria } from "./Categoria";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string 

    @Column()
    public descricao?: string 

    @Column()
    public preco: number

    @Column()
    public quantidade: number

    @CreateDateColumn()
    public dataCriacao: Date

    @Column({ nullable: true })
    public dataAtualizacao?: Date

    @ManyToOne(() => Categoria, { eager: true }) // Mapeia a relação
    @JoinColumn({ name: "categoriaId" }) // Especifica que esse campo armazenará o ID
    public categoria: Categoria;


    public constructor(nome: string, descricao: string, preco: number, quantidade: number, categoria: Categoria) {
        this.id = 0
        this.nome = nome;
        this.descricao = descricao ?? "";
        this.preco = preco;
        this.quantidade = quantidade;
        this.categoria = categoria;
        this.dataCriacao = new Date;
    }
}