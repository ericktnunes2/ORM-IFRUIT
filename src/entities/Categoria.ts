import {PrimaryGeneratedColumn, Entity, Collection, Column, OneToMany} from "typeorm"
import "reflect-metadata";
import { Produto } from "./Produto";

@Entity()
export class Categoria{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nome: string; 

    @Column()
    public descricao: string 

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public dataCriacao: Date

    @OneToMany(() => Produto, (produto) => produto.categoria)
    public produtos!: Produto[];

    public constructor(nome: string, descricao: string){
            this.id = 0
            this.nome = nome 
            this.descricao = descricao
            this.dataCriacao = new Date()
    }
}