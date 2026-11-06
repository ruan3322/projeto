const express = require('express');
const app = express();

app.use(express.json());


pizzas = [
  {
    id: 1,
    nome: "pizza de presunto e queijo",
    preco: 35.00
  },
  {
    id: 2,
    nome: "pizza de calabresa",
    preco: 38.50
  },
  {
    id: 3,
    nome: "coca cola",
    preco: 8.00
  },
  {
    id: 4,
    nome: "pizza de frango",
    preco: 40.00
  },
  {
    id: 5,
    nome: "pizza de carne seca",
    preco: 45.00
  },
  {
    id: 6,
    nome: "pepsi",
    preco: 7.50
  }

];
app.get('/pizza', (req, res) => {
    res.json(pizzas);
});
app.get('/pizza/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pizza = pizzas.find(p => p.id === id);

    if (!pizza) {
        return res.status(404).json({ erro: "produto não encontrada." });
    }

    res.json(pizza);
});

app.post('/pizza', (req, res) => {
    const { nome, preco} = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: "Título e descrição são obrigatórios." });
    }

    const novoId = pizzas.length > 0 ? pizzas[pizzas.length - 1].id + 1 : 1;
    
    const novaPizza = {
        id: novoId,
        nome,
        preco: Number(preco)
    };

    pizzas.push(novaPizza);
    res.status(201).json(novaPizza);
});

app.put('/pizza/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco } = req.body;
  const index = pizzas.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Item não encontrado." });
  }

  if (!nome || preco === undefined) {
    return res.status(400).json({ mensagem: "Nome e preço são obrigatórios para substituição completa (PUT)." });
  }

  pizzas[index] = { id, nome, preco: Number(preco) };
  res.json(pizzas[index]);
});

app.patch('/pizza/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, preco } = req.body;
  const pizza = pizzas.find(p => p.id === id);

  if (!pizza) {
    return res.status(404).json({ mensagem: "Item não encontrado." });
  }

  if (nome !== undefined) pizza.nome = nome;
  if (preco !== undefined) pizza.preco = Number(preco);

  res.json(pizza);
});

app.delete('/pizza/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pizzas.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Item não encontrado." });
  }

  const itemRemovido = pizzas.splice(index, 1);
  res.json({ mensagem: "Item removido com sucesso.", item: itemRemovido[0] });
});

app.listen(3000 , () => {
    console.log('sevirdor a funcionar na porta 3000');
})
  
    