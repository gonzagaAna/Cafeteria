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
});
