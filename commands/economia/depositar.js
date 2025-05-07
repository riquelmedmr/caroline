const fs = require('fs');
const banco = require('../../data/banco.json');

module.exports = {
  name: 'depositar',
  description: 'Deposita Dinheiro Da Carteira Para O Banco.',
  execute(message, args) {
    const id = message.author.id;
    const valor = parseInt(args[0]);

    if (!valor || isNaN(valor) || valor <= 0)
      return message.reply('Informe Um Valor Válido Para Depositar.');

    if (!banco[id]) banco[id] = { wallet: 0, bank: 0 };
    if (banco[id].wallet < valor)
      return message.reply('Você Não Tem Dinheiro Suficiente Na Carteira.');

    banco[id].wallet -= valor;
    banco[id].bank += valor;

    fs.writeFileSync('./data/banco.json', JSON.stringify(banco, null, 2));
    message.channel.send(`Você Depositou R$${valor} No Banco.`);
  }
};