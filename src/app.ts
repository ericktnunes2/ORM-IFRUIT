import * as readline from "readline";
import { CategoriaService } from "./services/CategoriaService";
import { ProdutoService } from "./services/ProdutoService";
import { AppDataSource } from "./data-source";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const categoriaService = new CategoriaService();
const produtoService = new ProdutoService();

async function mainMenu() {
    console.log("\n=== Gerenciamento de Inventário ===");
    console.log("1. Gerenciar Categorias");
    console.log("2. Gerenciar Produtos");
    console.log("0. Sair");

    rl.question("Escolha uma opção: ", async (option) => {
        switch (option) {
            case "1":
                await categoriaMenu();
                break;
            case "2":
                await produtoMenu();
                break;
            case "0":
                rl.close();
                break;
            default:
                console.log("Opção inválida!");
                mainMenu();
        }
    });
}

async function categoriaMenu() {
    console.log("\n=== Gerenciamento de Categorias ===");
    console.log("1. Criar Categoria");
    console.log("2. Listar Categorias");
    console.log("3. Buscar Categoria por ID");
    console.log("4. Buscar Categoria por Nome");
    console.log("5. Atualizar Categoria");
    console.log("6. Remover Categoria");
    console.log("0. Voltar");

    rl.question("Escolha uma opção: ", async (option) => {
        switch (option) {
            case "1":
                await criarCategoria();
                break;
            case "2":
                await listarCategorias();
                break;
            case "3":
                await buscarCategoriaPorId();
                break;
            case "4":
                await buscarCategoriaPorNome();
                break;
            case "5":
                await atualizarCategoria();
                break;
            case "6":
                await removerCategoria();
                break;
            case "0":
                mainMenu();
                break;
            default:
                console.log("Opção inválida!");
                categoriaMenu();
        }
    });
}

async function produtoMenu() {
    console.log("\n=== Gerenciamento de Produtos ===");
    console.log("1. Criar Produto");
    console.log("2. Listar Produtos");
    console.log("3. Buscar Produto por ID");
    console.log("4. Buscar Produto por Nome");
    console.log("5. Buscar Produtos por Categoria");
    console.log("6. Atualizar Produto");
    console.log("7. Remover Produto");
    console.log("0. Voltar");

    rl.question("Escolha uma opção: ", async (option) => {
        switch (option) {
            case "1":
                await criarProduto();
                break;
            case "2":
                await listarProdutos();
                break;
            case "3":
                await buscarProdutoPorId();
                break;
            case "4":
                await buscarProdutoPorNome();
                break;
            case "5":
                await buscarProdutosPorCategoria();
                break;
            case "6":
                await atualizarProduto();
                break;
            case "7":
                await removerProduto();
                break;
            case "0":
                mainMenu();
                break;
            default:
                console.log("Opção inválida!");
                produtoMenu();
        }
    });
}

// Implementações das funções para Categorias
async function criarCategoria() {
    rl.question("Nome da categoria: ", async (nome) => {
        rl.question("Descrição: ", async (descricao) => {
            try {
                const categoria = await categoriaService.create(nome, descricao);
                console.log("Categoria criada com sucesso:", categoria);
            } catch (error) {
                console.error("Erro ao criar categoria:", error);
            } finally {
                categoriaMenu();
            }
        });
    });
}

async function listarCategorias() {
    try {
        const categorias = await categoriaService.findAll();
        console.log("\n=== Categorias Cadastradas ===");
        console.table(categorias);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
    } finally {
        categoriaMenu();
    }
}

async function buscarCategoriaPorId() {
    rl.question("ID da categoria: ", async (id) => {
        try {
            const categoria = await categoriaService.findById(parseInt(id));
            if (categoria) {
                console.log("\n=== Categoria Encontrada ===");
                console.table([categoria]);
            } else {
                console.log("Categoria não encontrada!");
            }
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
        } finally {
            categoriaMenu();
        }
    });
}

async function buscarCategoriaPorNome() {
    rl.question("Nome da categoria: ", async (nome) => {
        try {
            const categoria = await categoriaService.findByName(nome);
            if (categoria) {
                console.log("\n=== Categoria Encontrada ===");
                console.table([categoria]);
            } else {
                console.log("Categoria não encontrada!");
            }
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
        } finally {
            categoriaMenu();
        }
    });
}

async function atualizarCategoria() {
    rl.question("ID da categoria a ser atualizada: ", async (id) => {
        try {
            const categoriaExistente = await categoriaService.findById(parseInt(id));
            if (!categoriaExistente) {
                console.log("Categoria não encontrada!");
                return categoriaMenu();
            }

            rl.question(`Novo nome [${categoriaExistente.nome}]: `, async (nome) => {
                rl.question(`Nova descrição [${categoriaExistente.descricao}]: `, async (descricao) => {
                    const categoriaAtualizada = await categoriaService.update(
                        parseInt(id),
                        nome || categoriaExistente.nome,
                        descricao || categoriaExistente.descricao
                    );

                    if (categoriaAtualizada) {
                        console.log("Categoria atualizada com sucesso:", categoriaAtualizada);
                    } else {
                        console.log("Falha ao atualizar categoria!");
                    }
                    categoriaMenu();
                });
            });
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
            categoriaMenu();
        }
    });
}

async function removerCategoria() {
    rl.question("ID da categoria a ser removida: ", async (id) => {
        try {
            const sucesso = await categoriaService.delete(parseInt(id));
            if (sucesso) {
                console.log("Categoria removida com sucesso!");
            } else {
                console.log("Falha ao remover categoria. Verifique se não há produtos associados.");
            }
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
        } finally {
            categoriaMenu();
        }
    });
}

// Implementações das funções para Produtos
async function criarProduto() {
    try {
        const categorias = await categoriaService.findAll();
        if (categorias.length === 0) {
            console.log("Nenhuma categoria cadastrada. Crie uma categoria primeiro.");
            return produtoMenu();
        }

        console.log("\n=== Categorias Disponíveis ===");
        console.table(categorias);

        rl.question("Nome do produto: ", async (nome) => {
            rl.question("Descrição (opcional): ", async (descricao) => {
                rl.question("Preço: ", async (preco) => {
                    rl.question("Quantidade: ", async (quantidade) => {
                        rl.question("ID da categoria: ", async (categoriaId) => {
                            try {
                                const produto = await produtoService.create(
                                    nome,
                                    descricao,
                                    parseFloat(preco),
                                    parseInt(quantidade),
                                    parseInt(categoriaId)
                                );

                                if (produto) {
                                    console.log("Produto criado com sucesso:", produto);
                                } else {
                                    console.log("Falha ao criar produto. Verifique o ID da categoria.");
                                }
                            } catch (error) {
                                console.error("Erro ao criar produto:", error);
                            } finally {
                                produtoMenu();
                            }
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        produtoMenu();
    }
}

async function listarProdutos() {
    try {
        const produtos = await produtoService.findAll();
        console.log("\n=== Produtos Cadastrados ===");
        console.table(produtos.map(p => ({
            id: p.id,
            nome: p.nome,
            preço: p.preco,
            quantidade: p.quantidade,
            categoria: p.categoria.nome
        })));
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
    } finally {
        produtoMenu();
    }
}

async function buscarProdutoPorId() {
    rl.question("ID do produto: ", async (id) => {
        try {
            const produto = await produtoService.findById(parseInt(id));
            if (produto) {
                console.log("\n=== Produto Encontrado ===");
                console.table([{
                    id: produto.id,
                    nome: produto.nome,
                    descrição: produto.descricao,
                    preço: produto.preco,
                    quantidade: produto.quantidade,
                    categoria: produto.categoria.nome,
                    "data criação": produto.dataCriacao,
                    "data atualização": produto.dataAtualizacao
                }]);
            } else {
                console.log("Produto não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        } finally {
            produtoMenu();
        }
    });
}

async function buscarProdutoPorNome() {
    rl.question("Nome do produto: ", async (nome) => {
        try {
            const produtos = await produtoService.findByName(nome);
            if (produtos.length > 0) {
                console.log("\n=== Produtos Encontrados ===");
                console.table(produtos.map(p => ({
                    id: p.id,
                    nome: p.nome,
                    preço: p.preco,
                    quantidade: p.quantidade,
                    categoria: p.categoria.nome
                })));
            } else {
                console.log("Nenhum produto encontrado com esse nome!");
            }
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            produtoMenu();
        }
    });
}

async function buscarProdutosPorCategoria() {
    try {
        const categorias = await categoriaService.findAll();
        if (categorias.length === 0) {
            console.log("Nenhuma categoria cadastrada.");
            return produtoMenu();
        }

        console.log("\n=== Categorias Disponíveis ===");
        console.table(categorias);

        rl.question("ID da categoria: ", async (categoriaId) => {
            try {
                const produtos = await produtoService.findByCategory(parseInt(categoriaId));
                if (produtos.length > 0) {
                    console.log("\n=== Produtos na Categoria ===");
                    console.table(produtos.map(p => ({
                        id: p.id,
                        nome: p.nome,
                        preço: p.preco,
                        quantidade: p.quantidade
                    })));
                } else {
                    console.log("Nenhum produto encontrado nesta categoria!");
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                produtoMenu();
            }
        });
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
        produtoMenu();
    }
}

async function atualizarProduto() {
    rl.question("ID do produto a ser atualizado: ", async (id) => {
        try {
            const produtoExistente = await produtoService.findById(parseInt(id));
            if (!produtoExistente) {
                console.log("Produto não encontrado!");
                return produtoMenu();
            }

            const categorias = await categoriaService.findAll();
            console.log("\n=== Categorias Disponíveis ===");
            console.table(categorias);

            rl.question(`Novo nome [${produtoExistente.nome}]: `, async (nome) => {
                rl.question(`Nova descrição [${produtoExistente.descricao}]: `, async (descricao) => {
                    rl.question(`Novo preço [${produtoExistente.preco}]: `, async (preco) => {
                        rl.question(`Nova quantidade [${produtoExistente.quantidade}]: `, async (quantidade) => {
                            rl.question(`Novo ID da categoria [${produtoExistente.categoria.id}]: `, async (categoriaId) => {
                                try {
                                    const produtoAtualizado = await produtoService.update(
                                        parseInt(id),
                                        nome || produtoExistente.nome,
                                        descricao || produtoExistente.descricao,
                                        preco ? parseFloat(preco) : produtoExistente.preco,
                                        quantidade ? parseInt(quantidade) : produtoExistente.quantidade,
                                        categoriaId ? parseInt(categoriaId) : produtoExistente.categoria.id
                                    );

                                    if (produtoAtualizado) {
                                        console.log("Produto atualizado com sucesso:", produtoAtualizado);
                                    } else {
                                        console.log("Falha ao atualizar produto. Verifique o ID da categoria.");
                                    }
                                } catch (error) {
                                    console.error("Erro ao atualizar produto:", error);
                                } finally {
                                    produtoMenu();
                                }
                            });
                        });
                    });
                });
            });
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            produtoMenu();
        }
    });
}

async function removerProduto() {
    rl.question("ID do produto a ser removido: ", async (id) => {
        try {
            const sucesso = await produtoService.delete(parseInt(id));
            if (sucesso) {
                console.log("Produto removido com sucesso!");
            } else {
                console.log("Falha ao remover produto.");
            }
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        } finally {
            produtoMenu();
        }
    });
}

// Inicialização da aplicação
AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!");
        mainMenu();
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });