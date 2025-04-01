import promptSync = require("prompt-sync");
const prompt = promptSync();

interface Categoria {
    id: number;
    nome: string;
    descricao: string;
    dataCriacao: Date;
}

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoriaId: number;
    dataCriacao: Date;
    dataAtualizacao?: Date;
}

let produtos: Produto[] = [];
let categorias: Categoria[] = [];
let working = true;
let idCounterCategoria = 1;
let idCounterProduto = 1;

while (working) {
    let workingCategory = true;
    let workingProduct = true;

    let escolha = Number(prompt("[1] Categoria | [2] Produto | [3] Sair: "))

    if (escolha == 1){
        while (workingCategory){
            let escolhaCategoria = Number(prompt("[1] Cadastrar categoria | [2] Excluir | [3] Editar | [4] Sair: "))

            if (escolhaCategoria === 1) {
                const categoria: Categoria = {
                    id: idCounterCategoria,
                    nome: prompt("Qual o nome da categoria?"),
                    descricao: prompt("Qual a descrição da categoria?"),
                    dataCriacao: new Date(),
                };
                idCounterCategoria++;
                categorias.push(categoria);
            }
            else if (escolhaCategoria === 2) {
                console.log(categorias);
                let id = Number(prompt("Qual o id da categoria que você quer excluir?"));
                categorias = categorias.filter(categoria => categoria.id !== id);
            }
            else if (escolhaCategoria === 3) {
                console.log(categorias);
                let id = Number(prompt("Qual o id da categoria que você quer editar?"));
                let categoriaParaEditar = categorias.find(categoria => categoria.id === id);
                
                if (categoriaParaEditar) {
                    categoriaParaEditar.nome = prompt("Qual o novo nome?");
                    categoriaParaEditar.descricao = prompt("Qual o novo valor?");
                } else {
                    console.log("Categoria não encontrado");
                }
            }
            else {
                workingCategory = false;
            }
        }
    }
    else if (escolha == 2){
        while(workingProduct){
            let escolhaProduto = Number(prompt("[1] Cadastrar produto | [2] Excluir | [3] Editar | [4] Sair: "));

            if (escolhaProduto === 1) {
                console.log(categorias)
                const produto: Produto = {
                    id: idCounterProduto,
                    nome: prompt("Qual o nome do produto?"),
                    descricao: prompt("Qual a descrição do produto?"),
                    preco: Number(prompt("Qual o preço do produto?")),
                    quantidade: Number(prompt("Qual a quantidade do produto?")),
                    categoriaId: Number(prompt("Qual o id da categoria que esse produto faz parte?")),
                    dataCriacao: new Date(),
                };
                idCounterProduto++;
                produtos.push(produto);
            } 
            else if (escolhaProduto === 2) {
                console.log(produtos);
                let id = Number(prompt("Qual o id do produto que você quer excluir?"));
                produtos = produtos.filter(produto => produto.id !== id);
            } 
            else if (escolhaProduto === 3) {
                console.log(produtos);
                let id = Number(prompt("Qual o id do produto que você quer editar?"));
                let produtoParaEditar = produtos.find(produto => produto.id === id);
                
                if (produtoParaEditar) {
                    produtoParaEditar.nome = prompt("Qual o novo nome?");
                    produtoParaEditar.descricao = prompt("Qual a nova descrição?")
                    produtoParaEditar.preco = Number(prompt("Qual o novo valor?"));
                    produtoParaEditar.quantidade = Number(prompt("Qual a nova quantidade?"))
                    produtoParaEditar.dataAtualizacao = new Date();
                } else {
                    console.log("Produto não encontrado");
                }
            } 
            else {
                workingProduct = false;
            }
        }
    }
    else{
        working = false
    }
    
}

console.log(categorias);
console.log(produtos);
