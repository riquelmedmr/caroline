const fs = require('fs');
const banco = require('../../data/banco.json');

module.exports = {
  name: 'saldo',
  description: 'Mostra Seu Saldo Bancário E Dinheiro Em Mãos.',
  execute(message) {
    const id = message.author.id;
    if (!banco[id]) banco[id] = { wallet: 0, bank: 0 };

    const { wallet, bank } = banco[id];
    message.channel.send(`Carteira: R$${wallet}\nBanco: R$${bank}`);
  }
};