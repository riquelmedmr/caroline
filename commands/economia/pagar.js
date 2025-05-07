const fs = require('fs');
const banco = require('../../data/banco.json');

module.exports = {
  name: 'pagar',
  description: 'Transfere Dinheiro Para Outro Usuário.',
  execute(message, args) {
    const senderId = message.author.id;
    const user = message.mentions.users.first();
    const valor = parseInt(args[1]);

    if (!user || isNaN(valor) || valor <= 0)
      return message.reply('Use: !pagar @usuário <quantia>');

    if (!banco[senderId]) banco[senderId] = { wallet: 0, bank: 0 };
    if (!banco[user.id]) banco[user.id] = { wallet: 0, bank: 0 };

    if (banco[senderId].wallet < valor)
      return message.reply('Você Não Tem Dinheiro Suficiente.');

    banco[senderId].wallet -= valor;
    banco[user.id].wallet += valor;

    fs.writeFileSync('./data/banco.json', JSON.stringify(banco, null, 2));
    message.channel.send(`Você Enviou R$${valor} Para ${user.tag}.`);
  }
};