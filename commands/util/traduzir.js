const fetch = require('node-fetch');

module.exports = {
  name: 'traduzir',
  description: 'Traduz Um Texto Para O Português.',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Por Favor, Forneça O Texto Que Deseja Traduzir.');
    }

    const texto = args.join(' ');
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(texto)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const traducao = data[0].map(item => item[0]).join('');
      const idiomaOrigem = data[2];

      message.channel.send(`**Idioma Detectado:** ${idiomaOrigem.toUpperCase()}\n**Tradução:** ${traducao}`);
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu Um Erro Ao Tentar Traduzir O Texto.');
    }
  }
};