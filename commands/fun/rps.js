module.exports = {
  name: 'rps',
  description: 'Jogue Pedra, Papel Ou Tesoura Com O Bot.',
  execute(message, args) {
    const escolhas = ['pedra', 'papel', 'tesoura'];
    const escolhaUsuario = args[0]?.toLowerCase();

    if (!escolhas.includes(escolhaUsuario)) {
      return message.reply('Escolha Inválida. Use: `!rps pedra`, `!rps papel`, `!rps tesoura`.');
    }

    const escolhaBot = escolhas[Math.floor(Math.random() * escolhas.length)];

    let resultado = '';
    if (escolhaUsuario === escolhaBot) {
      resultado = 'Empatamos!';
    } else if (
      (escolhaUsuario === 'pedra' && escolhaBot === 'tesoura') ||
      (escolhaUsuario === 'papel' && escolhaBot === 'pedra') ||
      (escolhaUsuario === 'tesoura' && escolhaBot === 'papel')
    ) {
      resultado = 'Você Ganhou!';
    } else {
      resultado = 'Eu Ganhei!';
    }

    message.channel.send(`Você Escolheu **${escolhaUsuario}**.\nEu Escolhi **${escolhaBot}**.\n**${resultado}**`);
  }
};