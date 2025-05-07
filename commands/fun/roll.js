module.exports = {
  name: 'roll',
  description: 'Gira Um Número Aleatório Entre 1 E O Valor Que Você Escolher (Padrão: 100).',
  execute(message, args) {
    let max = 100;

    if (args[0]) {
      const parsed = parseInt(args[0]);
      if (isNaN(parsed) || parsed < 1) {
        return message.reply('Por Favor, Forneça Um Número Válido Maior Que 0.');
      }
      max = parsed;
    }

    const result = Math.floor(Math.random() * max) + 1;
    message.channel.send(`🎲 Você Tirou: **${result}** De ${max}`);
  }
};