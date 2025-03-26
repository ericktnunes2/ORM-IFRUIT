interface Produto {
    id: number;
    nome: String;
    preco: number;
}

class ProdutosEstoque {
    id: number;
    nome: String;
    preco: number;

    constructor (id: number, nome: String, preco: number) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
}

var produtos: Produto[] = []

var working = true

while (working){
   var escolha = Number(prompt("[1] Cadastrar produto | [2] Excluir | [3] Editar | [4] Sair"))
   if (escolha == 1){
    const produto: Produto = new ProdutosEstoque(
        Number(prompt("Qual o id do produto?")), 
        String(prompt("Qual o nome do produto?")), 
        Number(prompt("Qual o preço do produto?"))
    )
    produtos.push(produto)
   }
   else if (escolha == 2){
    console.log(produtos)
    var id = Number(prompt("Qual o id do objeto que você quer tirar?"))
    produtos = produtos.filter(produto => produto.id !== id )
   }
   else if (escolha == 3){
    console.log(produtos)
    var id = Number(prompt("Qual o id do objeto que você quer editar?"))
    var produtoParaEditar = produtos.find(produto => produto.id == id)
    produtoParaEditar.nome = String(prompt("Qual o novo nome?"))
    produtoParaEditar.preco =  Number(prompt("Qual o novo valor?"))
   }
   else{
    working = false
   }
}

console.log(produtos)




  
