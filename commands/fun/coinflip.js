module.exports = {
  name: 'coinflip',
  description: 'Gira Uma Moeda E Retorna Cara Ou Coroa.',
  execute(message) {
    const resultado = Math.random() < 0.5 ? 'Cara' : 'Coroa';
    message.channel.send(`🪙 A Moeda Caiu Em: **${resultado}**!`);
  }
};