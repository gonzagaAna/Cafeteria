//
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.post('/salvar-carrinho', (req, res) => {
    fs.writeFile('carrinho.json', JSON.stringify(req.body, null, 2), err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao salvar o carrinho');
        }
        res.send('Carrinho salvo com sucesso!');
    });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
