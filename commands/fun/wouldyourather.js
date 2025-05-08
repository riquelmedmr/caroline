module.exports = {
  name: 'wouldyourather',
  description: 'Faz Uma Pergunta De "Você Preferiria...?".',
  execute(message) {
    const perguntas = [
      'Você Preferiria Ser Invisível Ou Poder Voar?',
      'Você Preferiria Viver Sem Internet Ou Sem Música?',
      'Você Preferiria Viajar Para O Futuro Ou Para O Passado?',
      'Você Preferiria Ser Rico E Infeliz Ou Pobre E Feliz?',
      'Você Preferiria Nunca Mais Sentir Fome Ou Nunca Mais Sentir Sono?',
      'Você Preferiria Ter Superforça Ou Superinteligência?',
      'Você Preferiria Sempre Falar Tudo Que Pensa Ou Nunca Mais Poder Falar?',
      'Você Preferiria Morar Na Lua Ou No Fundo Do Mar?',
      'Você Preferiria Viver Em Um Mundo Sem Memes Ou Sem Vídeos Engraçados?',
      'Você Preferiria Ser Famoso Por Algo Ruim Ou Ser Completamente Desconhecido?'
    ];

    const pergunta = perguntas[Math.floor(Math.random() * perguntas.length)];
    message.channel.send(`❓ **Você Preferiria...**\n${pergunta}`);
  }
};