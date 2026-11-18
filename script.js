// Preços 
let precosTamanhos = {
    P: 35.90,
    M: 45.90,
    G: 65.90
};

//  sabores  + Bebidas
let produtos = [
    {
        id: 1,
        nome: "Calabresa",
        categoria: "pizza",
        descricao: "Líder nas vendas nacionais, com linguiça calabresa, molho de tomate, cebola, mussarela e orégano.",
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        nome: "Mussarela",
        categoria: "pizza",
        descricao: "Clássica e versátil, leva molho de tomate, farta camada de queijo mussarela, tomate e orégano.",
        imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        nome: "Portuguesa",
        categoria: "pizza",
        descricao: "Muito pedida em todo o país, combina presunto, mussarela, ovo, cebola, azeitona e ervilha.",
        imagem: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        nome: "Frango com Catupiry",
        categoria: "pizza",
        descricao: "Frango desfiado temperado coberto com requeijão tipo Catupiry e mussarela.",
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        nome: "Margherita",
        categoria: "pizza",
        descricao: "Molho de tomate, mussarela, rodelas de tomate e manjericão fresco.",
        imagem: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 6,
        nome: "Quatro Queijos",
        categoria: "pizza",
        descricao: "Mistura de queijos selecionados (mussarela, parmesão, provolone e Catupiry).",
        imagem: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 7,
        nome: "Lata de Refrigerante Coca-Cola",
        categoria: "bebida",
        preco: 6.00,
        descricao: "Lata 350ml bem gelada.",
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
    },
    {
        id: 8,
        nome: "Garrafa de Água 500 ml",
        categoria: "bebida",
        preco: 4.00,
        descricao: "Água mineral sem gás 500ml.",
        imagem: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80"
    }
];

let carrinho = [];
let adminLogado = false;
let filtroAtual = 'todos';

window.onload = function () {
    carregarCardapio();
};

// navegação entre abas
function mudarAba(aba) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('active'));

    if (aba === 'cardapio') {
        document.getElementById('secao-cardapio').classList.add('ativa');
        document.getElementById('btn-cardapio').classList.add('active');
        carregarCardapio(filtroAtual);
    }
}

// RENDERIZAR
function carregarCardapio(categoria = 'todos') {
    filtroAtual = categoria;
    const container = document.getElementById('lista-produtos');
    container.innerHTML = '';

    const filtrados = categoria === 'todos'
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    filtrados.forEach(produto => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4 d-flex';

        let seletorEPrecoHTML = '';
        let badgeTexto = '';

        if (produto.categoria === 'pizza') {
            badgeTexto = '<i class="fa-solid fa-snowflake"></i> PRÉ-PRONTA (ASSAR EM CASA)';
            seletorEPrecoHTML = `
                <div class="mb-3">
                    <label for="tamanho-${produto.id}" class="form-label fw-bold text-pepper small mb-1">Escolha o Tamanho:</label>
                    <select id="tamanho-${produto.id}" class="form-select form-select-sm border-danger">
                        <option value="P">Tamanho P - R$ ${precosTamanhos.P.toFixed(2).replace('.', ',')}</option>
                        <option value="M" selected>Tamanho M - R$ ${precosTamanhos.M.toFixed(2).replace('.', ',')}</option>
                        <option value="G">Tamanho G - R$ ${precosTamanhos.G.toFixed(2).replace('.', ',')}</option>
                    </select>
                </div>
            `;
        } else {
            badgeTexto = '<i class="fa-solid fa-glass-water"></i> BEBIDA GELADA';
            seletorEPrecoHTML = `
                <div class="mb-3">
                    <span class="fs-5 fw-bold text-pepper">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            `;
        }

        // Caixa flutuante estruturada para não misturar com texto
        const imgContent = produto.imagem
            ? `<img src="${produto.imagem}" alt="${produto.nome}" onerror="this.parentElement.innerHTML='<div class=\\'sem-imagem-placeholder\\'><i class=\\'fa-solid fa-image fs-2 mb-1\\'></i><span>Sem foto</span></div>'">`
            : `<div class="sem-imagem-placeholder"><i class="fa-solid fa-image fs-2 mb-1"></i><span>Sem foto</span></div>`;

        col.innerHTML = `
            <div class="card produto-card w-100">
                <div class="caixa-flutuante-img">
                    ${imgContent}
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <span class="badge mb-2" style="background-color: #F5E6D3; color: #7F1D1D;">${badgeTexto}</span>
                        <h5 class="card-title fw-bold text-pepper mb-2">${produto.nome}</h5>
                        <p class="card-text text-muted small">${produto.descricao}</p>
                    </div>
                    <div class="mt-auto">
                        ${seletorEPrecoHTML}
                        <button class="btn btn-pepper w-100 fw-bold py-2" onclick="adicionarAoCarrinho(${produto.id})">
                            <i class="fa-solid fa-plus"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function filtrarProdutos(cat, botao) {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
    carregarCardapio(cat);
}

// CARRINHO DE COMPRAS
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    let chaveItem = `${id}`;
    let nomeExibicao = produto.nome;
    let precoUnitario = produto.preco;

    if (produto.categoria === 'pizza') {
        const tamanhoEscolhido = document.getElementById(`tamanho-${id}`).value;
        chaveItem = `${id}-${tamanhoEscolhido}`;
        nomeExibicao = `Pizza ${produto.nome} (Tam. ${tamanhoEscolhido})`;
        precoUnitario = precosTamanhos[tamanhoEscolhido];
    }

    const existente = carrinho.find(item => item.chave === chaveItem);
    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            chave: chaveItem,
            nome: nomeExibicao,
            preco: precoUnitario,
            quantidade: 1
        });
    }

    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    document.getElementById('contador-carrinho').innerText = total;
}

function renderizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    container.innerHTML = '';

    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-3">Seu carrinho está vazio.</p>';
        document.getElementById('preco-total').innerText = 'R$ 0,00';
        return;
    }

    let totalGeral = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const div = document.createElement('div');
        div.className = 'd-flex justify-content-between align-items-center border-bottom pb-2 mb-2';
        div.innerHTML = `
            <div>
                <h6 class="mb-0 fw-bold text-pepper">${item.nome}</h6>
                <small class="text-muted">R$ ${item.preco.toFixed(2).replace('.', ',')} cada</small>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade('${item.chave}', -1)">-</button>
                <span class="fw-bold">${item.quantidade}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade('${item.chave}', 1)">+</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById('preco-total').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function alterarQuantidade(chave, delta) {
    const item = carrinho.find(i => i.chave === chave);
    if (!item) return;

    item.quantidade += delta;
    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(i => i.chave !== chave);
    }

    atualizarContadorCarrinho();
    renderizarCarrinho();
}

// envio do pedido ao whatssap
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert('Adicione pelo menos uma pizza ou bebida ao carrinho!');
        return;
    }

    const obs = document.getElementById('obs-pedido').value.trim();
    let texto = "*PEDIDO - PEPPER PIZZARIA (PRÉ-PRONTA)* 🍕❄️\n\n";

    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        texto += `▪️ ${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    });

    texto += `\n*Total do Pedido:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    texto += `💳 *Pagamento:* Na entrega (Maquininha de cartão ou dinheiro).\n`;

    if (obs !== "") {
        texto += `\n⚠️ *OBSERVAÇÕES / RETIRAR INGREDIENTES:*\n${obs}\n`;
    } else {
        texto += `\n⚠️ *Observações:* Nenhuma.\n`;
    }

    texto += `\nAguardo confirmação do pedido!`;

    const telefoneRestaurante = "5511999999999";
    const url = `https://wa.me/${telefoneRestaurante}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

// LOGIN E PAINEL ADMINISTRATIVO
function tentarAcessarAdmin() {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-admin').classList.add('active');

    if (adminLogado) {
        abrirPainelAdmin();
    } else {
        document.getElementById('secao-login-admin').classList.add('ativa');
    }
}

function fazerLogin(event) {
    event.preventDefault();
    const user = document.getElementById('usuario-login').value;
    const pass = document.getElementById('senha-login').value;

    if (user === "admin" && pass === "1234") {
        adminLogado = true;
        abrirPainelAdmin();
    } else {
        alert("Usuário ou senha incorretos! (Use admin / 1234)");
    }
}

function abrirPainelAdmin() {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.getElementById('secao-admin').classList.add('ativa');

    document.getElementById('preco-tam-P').value = precosTamanhos.P;
    document.getElementById('preco-tam-M').value = precosTamanhos.M;
    document.getElementById('preco-tam-G').value = precosTamanhos.G;

    carregarAdminTabela();
}

function sairAdmin() {
    adminLogado = false;
    document.getElementById('usuario-login').value = '';
    document.getElementById('senha-login').value = '';
    mudarAba('cardapio');
}

function atualizarPrecosTamanhos(event) {
    event.preventDefault();
    precosTamanhos.P = parseFloat(document.getElementById('preco-tam-P').value);
    precosTamanhos.M = parseFloat(document.getElementById('preco-tam-M').value);
    precosTamanhos.G = parseFloat(document.getElementById('preco-tam-G').value);
    alert("Tabela de preços das pizzas atualizada!");
    carregarCardapio(filtroAtual);
}

function alternarCampoPrecoNovo() {
    const cat = document.getElementById('novo-categoria').value;
    const grupoPreco = document.getElementById('grupo-preco-bebida');
    const inputPreco = document.getElementById('novo-preco');

    if (cat === 'bebida') {
        grupoPreco.style.display = 'block';
        inputPreco.required = true;
    } else {
        grupoPreco.style.display = 'none';
        inputPreco.required = false;
    }
}

function adicionarNovoProduto(event) {
    event.preventDefault();
    const nome = document.getElementById('novo-nome').value;
    const categoria = document.getElementById('novo-categoria').value;
    const descricao = document.getElementById('novo-descricao').value;
    const preco = categoria === 'bebida' ? parseFloat(document.getElementById('novo-preco').value) : null;
    const inputArquivo = document.getElementById('novo-imagem');

    const finalizarCadastro = (imgBase64) => {
        const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        produtos.push({ id: novoId, nome, categoria, preco, descricao, imagem: imgBase64 });
        document.getElementById('form-novo-produto').reset();
        alternarCampoPrecoNovo();
        carregarAdminTabela();
        alert("Item cadastrado com sucesso!");
    };

    if (inputArquivo.files && inputArquivo.files[0]) {
        const reader = new FileReader();
        reader.onload = e => finalizarCadastro(e.target.result);
        reader.readAsDataURL(inputArquivo.files[0]);
    } else {
        finalizarCadastro("");
    }
}

function carregarAdminTabela() {
    const container = document.getElementById('tabela-admin-produtos');
    container.innerHTML = '';

    produtos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'bg-white p-3 rounded border d-flex flex-wrap justify-content-between align-items-center gap-2';

        const campoPrecoHTML = p.categoria === 'bebida'
            ? `<div class="col-md-2"><input type="number" step="0.01" id="preco-edit-${p.id}" class="form-control form-control-sm" value="${p.preco}"></div>`
            : `<div class="col-md-2"><span class="badge bg-secondary">Preço P/M/G</span></div>`;

        div.innerHTML = `
            <div class="row g-2 flex-grow-1 align-items-center">
                <div class="col-md-4">
                    <input type="text" id="nome-edit-${p.id}" class="form-control form-control-sm" value="${p.nome}">
                </div>
                ${campoPrecoHTML}
                <div class="col-md-6">
                    <input type="file" id="img-edit-${p.id}" class="form-control form-control-sm" accept="image/*">
                </div>
            </div>
            <div class="d-flex gap-1">
                <button class="btn btn-success btn-sm" onclick="salvarEdicao(${p.id})"><i class="fa-solid fa-check"></i></button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${p.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        container.appendChild(div);
    });
}

function salvarEdicao(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    produto.nome = document.getElementById(`nome-edit-${id}`).value;
    if (produto.categoria === 'bebida') {
        produto.preco = parseFloat(document.getElementById(`preco-edit-${id}`).value);
    }

    const inputArquivo = document.getElementById(`img-edit-${id}`);
    if (inputArquivo.files && inputArquivo.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            produto.imagem = e.target.result;
            carregarAdminTabela();
            alert("Alterações e foto salvas!");
        };
        reader.readAsDataURL(inputArquivo.files[0]);
    } else {
        carregarAdminTabela();
        alert("Alterações salvas!");
    }
}

function excluirProduto(id) {
    if (confirm("Remover este item do cardápio?")) {
        produtos = produtos.filter(p => p.id !== id);
        carregarAdminTabela();
    }
}