const fs = require('fs');
const banco = require('../../data/banco.json');

module.exports = {
  name: 'apostar',
  description: 'Aposta Dinheiro Com Chance De Perder Ou Ganhar.',
  execute(message, args) {
    const id = message.author.id;
    const valor = parseInt(args[0]);

    if (!valor || isNaN(valor) || valor <= 0)
      return message.reply('Informe Um Valor Válido Para Apostar.');

    if (!banco[id]) banco[id] = { wallet: 0, bank: 0 };
    if (banco[id].wallet < valor)
      return message.reply('Você Não Tem Dinheiro Suficiente.');

    const resultado = Math.random() < 0.5 ? 'perdeu' : 'ganhou';
    const quantia = resultado === 'ganhou' ? valor : -valor;

    banco[id].wallet += quantia;
    fs.writeFileSync('./data/banco.json', JSON.stringify(banco, null, 2));

    message.channel.send(
      `Você Apostou R$${valor} E ${resultado === 'ganhou' ? 'Ganhou' : 'Perdeu'}! Saldo Atual: R$${banco[id].wallet}`
    );
  }
};