module.exports = {
  name: '8ball',
  description: 'Responde A Uma Pergunta Com Uma Resposta Aleatória.',
  execute(message, args) {
    if (!args.length) {
      return message.reply('Faça Uma Pergunta. Ex: `!8ball Vou Ganhar Na Loteria?`');
    }

    const respostas = [
      'Com Certeza.',
      'Definitivamente Sim.',
      'Provavelmente.',
      'Talvez.',
      'Não Tenho Certeza.',
      'Pergunte Novamente Mais Tarde.',
      'Não Conte Com Isso.',
      'Minhas Fontes Dizem Que Não.',
      'Muito Improvável.',
      'Sem Dúvidas!',
      'Sim!',
      'Negativo.',
      'Impossível.'
    ];

    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    message.channel.send(`🎱 ${resposta}`);
  }
};