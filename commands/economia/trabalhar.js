const fs = require('fs');
const banco = require('../../data/banco.json');
const cooldown = new Map();

module.exports = {
  name: 'trabalhar',
  description: 'Trabalhe E Ganhe Dinheiro (1h De Cooldown).',
  execute(message) {
    const id = message.author.id;
    const tempo = cooldown.get(id);
    const agora = Date.now();

    if (tempo && agora - tempo < 3600000)
      return message.reply('Você Só Pode Trabalhar A Cada 1 Hora.');

    const ganho = Math.floor(Math.random() * 500) + 100;
    if (!banco[id]) banco[id] = { wallet: 0, bank: 0 };

    banco[id].wallet += ganho;
    fs.writeFileSync('./data/banco.json', JSON.stringify(banco, null, 2));
    cooldown.set(id, agora);

    message.channel.send(`Você Trabalhou E Ganhou R$${ganho}!`);
  }
};