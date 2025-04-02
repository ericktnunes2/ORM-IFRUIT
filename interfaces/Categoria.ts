import { Produto } from "./Produto";

export interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    produtos?: Produto[];
}