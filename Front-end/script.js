let brownies = [];
let recheios = [];
let carrinho = [];
let total = 0;

// Carregar brownies
async function carregarBrownies() {
    const res = await fetch('http://localhost:8080/brownies');
    brownies = await res.json();
    const div = document.getElementById('brownie');
    div.innerHTML = '';
    brownies.forEach(b => {
        div.innerHTML += `<input type="radio" name="brownie" value="${b.id}" onchange="selecionarBrownie(${b.id})"> ${b.nome} (R$${b.preco})<br>`;
    });
    selecionarBrownie(brownies[0].id);
}

// Seleciona brownie e mostra recheios
async function selecionarBrownie(id) {
    const res = await fetch(`http://localhost:8080/brownie/${id}`);
    const data = await res.json();
    recheios = data.recheios;
    window.brownieSelecionado = data.brownie[0];

    const div = document.getElementById('recheios');
    div.innerHTML = '';
    recheios.forEach((r, i) => {
        div.innerHTML += `<input type="checkbox" id="r${i}"> ${r.nome} (R$${r.preco})<br>`;
    });
}

// Adiciona ao carrinho
function adicionarAoCarrinho() {
    const recheiosSelecionados = recheios.filter((_, i) => document.getElementById(`r${i}`).checked);
    const descricao = `${brownieSelecionado.nome} com ${recheiosSelecionados.map(r => r.nome).join(', ') || 'sem recheio'}`;
    const preco = Number(brownieSelecionado.preco) + recheiosSelecionados.reduce((acc, r) => acc + Number(r.preco), 0);

    carrinho.push({ id_brownie: brownieSelecionado.id, descricao, preco });
    total += preco;

    atualizarCarrinho();
    atualizarResumoPedido();
}

// Atualiza carrinho
function atualizarCarrinho() {
    const div = document.getElementById('carrinho');
    div.innerHTML = '';
    carrinho.forEach((item, i) => {
        div.innerHTML += `${item.descricao} - R$${item.preco.toFixed(2)} <button onclick="remover(${i})">Remover</button><br>`;
    });
    document.getElementById('total').innerText = total.toFixed(2);
}

// Remover item
function remover(i) {
    total -= carrinho[i].preco;
    carrinho.splice(i, 1);
    atualizarCarrinho();
    atualizarResumoPedido();
}

// Atualiza resumo no HTML
function atualizarResumoPedido() {
    const cpf = document.getElementById('cpf').value || "(não informado)";

    if (carrinho.length === 0) {
        document.getElementById('resumo-conteudo').innerHTML = "Nenhum item no carrinho.";
        return;
    }

    const resumoPedido = carrinho.map(item => 
        `• ${item.descricao} - R$${item.preco.toFixed(2)}`
    ).join('<br>');

    document.getElementById('resumo-conteudo').innerHTML = `
        <strong>CPF:</strong> ${cpf}<br><br>
        <strong>Itens:</strong><br>${resumoPedido}<br><br>
        <strong>Total:</strong> <span style="color:green;">R$${total.toFixed(2)}</span>
    `;
}

// Função pagar
async function confirmPayment() {
    const cpf = document.getElementById('cpf').value;

    if (!cpf) {
        Swal.fire("Erro!", "Por favor, informe o CPF!", "error");
        return;
    }

    if (carrinho.length === 0) {
        Swal.fire("Carrinho vazio!", "Adicione itens ao carrinho antes de finalizar.", "warning");
        return;
    }

    const resumoPedido = carrinho.map(item => 
        `• ${item.descricao} - R$${item.preco.toFixed(2)}`
    ).join('<br>');

    Swal.fire({
        title: "Deseja finalizar o pedido?",
        html: `<strong>CPF:</strong> ${cpf}<br><br>
               <strong>Itens:</strong><br>${resumoPedido}<br><br>
               <strong>Total:</strong> <span style="color:green;">R$${total.toFixed(2)}</span>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar Pagamento 🛒",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#8b4513",
        cancelButtonColor: "#d33"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const pedido = {
                cpf: cpf,
                data_pagamento: new Date().toISOString().split('T')[0],
                preco_total: total,
                items: carrinho
            };

            try {
                const res = await fetch('http://localhost:8080/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pedido)
                });

                if (res.ok) {
                    Swal.fire("Sucesso!", "Pedido realizado e salvo no banco! 🎉", "success");
                    carrinho = [];
                    total = 0;
                    atualizarCarrinho();
                    atualizarResumoPedido();
                } else {
                    Swal.fire("Erro!", "Erro ao salvar o pedido no banco.", "error");
                }
            } catch (error) {
                Swal.fire("Erro!", "Falha na conexão com o servidor.", "error");
            }
        }
    });
}

// Ver todo o histórico
async function getAllHistory() {
    const res = await fetch('http://localhost:8080/history');
    const historico = await res.json();

    if (historico.length === 0) {
        Swal.fire("Nenhum pedido encontrado!", "", "info");
        return;
    }

    const historicoFormatado = historico.map(pedido => {
        const itens = pedido.items.map(item => `• ${item.descricao} - R$${item.preco.toFixed(2)}`).join('<br>');

        return `
        <p><strong>Pedido ${pedido.id}</strong> - CPF: ${pedido.cpf} <br>
        Data: ${pedido.data_pagamento}<br>
        Total: <strong>R$${pedido.preco_total.toFixed(2)}</strong><br>
        Itens:<br>${itens}</p>
        <hr>`;
    }).join('');

    Swal.fire({
        title: "🧾 Histórico de Todos os Pedidos",
        html: historicoFormatado,
        width: 800,
        scrollbarPadding: false,
        confirmButtonText: "Fechar",
        confirmButtonColor: "#8b4513"
    });
}

window.onload = () => {
    carrinho = [];
    total = 0;
    
    //limpa o campo CPF ao recarregar
    document.getElementById('cpf').value = '';

    // Limpa carrinho e resumo também
    document.getElementById('carrinho').innerHTML = '';
    document.getElementById('resumo-conteudo').innerHTML = 'Nenhum item no carrinho.';

    // Carrega os brownies disponíveis
carregarBrownies();
};