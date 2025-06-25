document.addEventListener('DOMContentLoaded', function () {
    const botaoAdicionar = document.getElementById('adicionar-produto');
    const listaPedidos = document.getElementById('lista-pedidos');
    const totalElemento = document.getElementById('total');
    const nomeProdutoInput = document.getElementById('nome-produto');
    const precoProdutoInput = document.getElementById('preco-produto');

    let total = 0;

    botaoAdicionar.addEventListener('click', function () {
        const nomeProduto = nomeProdutoInput.value.trim();
        const precoProduto = parseFloat(precoProdutoInput.value);

        if (nomeProduto && !isNaN(precoProduto) && precoProduto > 0) {
            const li = document.createElement('li');

            li.innerHTML = `
                ${nomeProduto} - R$ ${precoProduto.toFixed(2).replace('.', ',')}
                <button class="remover">Remover</button>
            `;

            listaPedidos.appendChild(li);

            total += precoProduto;
            totalElemento.textContent = total.toFixed(2).replace('.', ',');

            nomeProdutoInput.value = '';
            precoProdutoInput.value = '';

            li.querySelector('.remover').addEventListener('click', function () {
                const preco = parseFloat(
                    this.parentElement.textContent.split(' - R$ ')[1].replace(',', '.')
                );

                total -= preco;
                totalElemento.textContent = total.toFixed(2).replace('.', ',');
                listaPedidos.removeChild(li);
            });
        } else {
            alert('Por favor, insira um nome e um preço válido.');
        }
    });

    const botaoSalvar = document.getElementById('salvar-carrinho');

botaoSalvar.addEventListener('click', function () {
    const itensCarrinho = [];
    listaPedidos.querySelectorAll('li').forEach(li => {
        const texto = li.firstChild.textContent.trim(); // ex: Café - R$ 10,00
        const [nome, precoTexto] = texto.split(' - R$ ');
        const preco = parseFloat(precoTexto.replace(',', '.'));
        itensCarrinho.push({ nome, preco });
    });

    fetch('/salvar-carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itensCarrinho)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Feedback ao usuário
    })
    .catch(err => {
        console.error('Erro ao salvar o carrinho:', err);
        alert('Erro ao salvar o carrinho');
    });
});


});


// 
