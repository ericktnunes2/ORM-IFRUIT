import promptSync from "prompt-sync";
import { MenuOpcoes, MenuProdutoOpcoes } from "./enum";
import { Categoria, Produto } from "./interface";
const prompt = promptSync();

class Gerenciador {
    private categorias: Categoria[] = [];
    private produtos: Produto[] = [];
    private idCounterCategoria = 1;
    private idCounterProduto = 1;

    iniciar() {
        let working = true;
        while (working) {
            console.log("\n======= Menu Principal =======");
            console.log("1 - Cadastrar Categoria");
            console.log("2 - Listar Categorias");
            console.log("3 - Buscar Categoria");
            console.log("4 - Excluir Categoria");
            console.log("5 - Editar Categoria");
            console.log("6 - Sair");
            console.log("==============================");
            const escolha = Number(prompt("Escolha uma opção: ")) as MenuOpcoes;

            switch (escolha) {
                case MenuOpcoes.CadastrarCategoria:
                    this.cadastrarCategoria();
                    break;
                case MenuOpcoes.ListarCategorias:
                    this.listarCategorias();
                    break;
                case MenuOpcoes.BuscarCategoria:
                    this.buscarCategoria();
                    break;
                case MenuOpcoes.ExcluirCategoria:
                    this.excluirCategoria();
                    break;
                case MenuOpcoes.EditarCategoria:
                    this.editarCategoria();
                    break;
                case MenuOpcoes.Sair:
                    this.exibirTodosItens();
                    working = false;
                    break;
                default:
                    console.log("Opção inválida!");
            }
        }
    }

    private exibirTodosItens(){
        console.log("\n======= Categorias e Produtos =======");

        if (this.categorias.length === 0) {
            console.log("Nenhuma categoria cadastrada.");
        } else {
            this.categorias.forEach(categoria => {
                console.log(`\n📂 Categoria: ${categoria.nome} (ID: ${categoria.id})`);
                console.log(`   Descrição: ${categoria.descricao}`);
                console.log(`   Criada em: ${categoria.dataCriacao.toLocaleDateString()}`);
                
                if (categoria.produtos && categoria.produtos.length > 0) {
                    console.log("   Produtos:");
                    categoria.produtos.forEach(produto => {
                        console.log(`     - 🛒 ${produto.nome} (ID: ${produto.id})`);
                        console.log(`       💰 Preço: R$${produto.preco.toFixed(2)} | 📦 Quantidade: ${produto.quantidade}`);
                        console.log(`       📅 Criado em: ${produto.dataCriacao.toLocaleDateString()}`);
                        if (produto.dataAtualizacao) {
                            console.log(`       🔄 Atualizado em: ${produto.dataAtualizacao.toLocaleDateString()}`);
                        }
                    });
                } else {
                    console.log("   ❌ Nenhum produto cadastrado nesta categoria.");
                }
            });
        }

        console.log("\n=====================================");
    }

    private cadastrarCategoria() {
        const categoria: Categoria = {
            id: this.idCounterCategoria++,
            nome: prompt("Nome da categoria: "),
            descricao: prompt("Descrição da categoria: "),
            dataCriacao: new Date(),
            produtos: []
        };
        this.categorias.push(categoria);
        console.log("Categoria cadastrada com sucesso!\n");
    }

    private listarCategorias() {
        console.log("\n======= Lista de Categorias =======");
        if (this.categorias.length === 0) {
            console.log("Nenhuma categoria cadastrada.");
        } else {
            this.categorias.forEach(categoria => {
                console.log(`ID: ${categoria.id} | Nome: ${categoria.nome} | Produtos: ${categoria.produtos?.length || 0}`);
            });
        }
    }

    private buscarCategoria() {
        const busca = prompt("Digite o ID ou nome da categoria: ") || "";
        const categoria = this.categorias.find(c => c.id === Number(busca) || c.nome.toLowerCase() === busca.toLowerCase());

        if (!categoria) {
            console.log("Categoria não encontrada.");
            return;
        }
        console.log("Categoria encontrada:", categoria);
        this.menuProduto(categoria);
    }

    private excluirCategoria() {
        const id = Number(prompt("Digite o ID da categoria que deseja excluir: "));
        let categoria = this.categorias.find(c => c.id == id)

        if(categoria?.produtos?.length !== 0){
            console.log("Essa categoria tem produtos cadastrados, gostaria de excluí-la?")
            console.log("1 - Sim")
            console.log("2 - Não")
            let escolha = Number(prompt("Escolha uma opção: "))
            if (escolha == 1){
                this.categorias = this.categorias.filter(c => c.id !== id);
                console.log("Categoria excluída com sucesso!");
            }
        }
        else{
            this.categorias = this.categorias.filter(c => c.id !== id);
            console.log("Categoria excluída com sucesso!");
        }
        
    }

    private editarCategoria() {
        const id = Number(prompt("Digite o ID da categoria que deseja editar: "));
        const categoria = this.categorias.find(c => c.id === id);
        if (!categoria) {
            console.log("Categoria não encontrada.");
            return;
        }
        categoria.nome = prompt("Novo nome da categoria: ") || categoria.nome;
        categoria.descricao = prompt("Nova descrição: ") || categoria.descricao;
        console.log("Categoria editada com sucesso!");
    }

    private menuProduto(categoria: Categoria) {
        let working = true;
        while (working) {
            console.log("\n======= Menu de Produtos =======");
            console.log("1 - Cadastrar Produto");
            console.log("2 - Listar Produtos");
            console.log("3 - Buscar Produto");
            console.log("4 - Excluir Produto");
            console.log("5 - Editar Produto");
            console.log("6 - Sair");
            console.log("==============================");
            const escolha = Number(prompt("Escolha uma opção: ")) as MenuProdutoOpcoes;

            switch (escolha) {
                case MenuProdutoOpcoes.CadastrarProduto:
                    this.cadastrarProduto(categoria);
                    break;
                case MenuProdutoOpcoes.ListarProdutos:
                    console.log(this.produtos);
                    break;
                case MenuProdutoOpcoes.BuscarProduto:
                    this.buscarProduto();
                    break;
                case MenuProdutoOpcoes.ExcluirProduto:
                    const idExcluir = Number(prompt("Digite o ID do produto: "));
                    categoria.produtos = categoria.produtos?.filter(p => p.id !== idExcluir) || [];
                    console.log("Produto excluído!");
                    break;
                case MenuProdutoOpcoes.EditarProduto:
                    this.editarProduto()
                    break;
                case MenuProdutoOpcoes.Sair:
                    working = false;
                    break;
                default:
                    console.log("Opção inválida!");
            }
        }
    }

    private cadastrarProduto(categoria: Categoria) {
        const produto: Produto = {
            id: this.idCounterProduto++,
            nome: prompt("Nome do produto: ") || "",
            descricao: prompt("Descrição do produto: ") || "",
            preco: Number(prompt("Preço: ")) || 0,
            quantidade: Number(prompt("Quantidade: ")) || 0,
            categoriaId: categoria.id,
            dataCriacao: new Date()
        };
        this.produtos.push(produto);
        categoria.produtos?.push(produto);
        console.log("Produto cadastrado com sucesso!");
    }

    private buscarProduto() {
        console.log("Você deseja por: ")
        console.log("1 - Id/nome do Produto")
        console.log("2 - Id/nome da Categoria")
        let opcao = Number(prompt("Escolha uma opção: "))
        if(opcao == 1){
            console.log("Qual o nome ou id do produto?")
            let buscaProduto = prompt(": ")
            let produto = this.produtos.find(p => p.id === Number(buscaProduto) || p.nome.toLowerCase == buscaProduto.toLowerCase)

            console.log(produto)
        }
        else{
            console.log("Qual o nome ou id da categoria?")
            let buscaProdutosDeCategoria = prompt(": ")
            let categoria = this.categorias.find(c => c.id === Number(buscaProdutosDeCategoria) || c.nome.toLowerCase == buscaProdutosDeCategoria.toLowerCase)

            console.log(categoria?.produtos)
        }
    }

    private editarProduto(){
        console.log("Qual o nome ou id do produto que você quer editar?")
        let busca = prompt(": ");
        let produtoParaEditar = this.produtos.find(p => p.id === Number(busca) || p.nome.toLowerCase == busca.toLowerCase);
        
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
}

new Gerenciador().iniciar();
