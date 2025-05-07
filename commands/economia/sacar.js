const fs = require('fs');
const banco = require('../../data/banco.json');

module.exports = {
  name: 'sacar',
  description: 'Saca Dinheiro Do Banco Para A Carteira.',
  execute(message, args) {
    const id = message.author.id;
    const valor = parseInt(args[0]);

    if (!valor || isNaN(valor) || valor <= 0)
      return message.reply('Informe Um Valor Válido Para Sacar.');

    if (!banco[id]) banco[id] = { wallet: 0, bank: 0 };
    if (banco[id].bank < valor)
      return message.reply('Você Não Tem Dinheiro Suficiente No Banco.');

    banco[id].bank -= valor;
    banco[id].wallet += valor;

    fs.writeFileSync('./data/banco.json', JSON.stringify(banco, null, 2));
    message.channel.send(`Você Sacou R$${valor} Do Banco.`);
  }
};