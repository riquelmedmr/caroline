const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  description: 'Envia Um Meme Brasileiro Aleatório.',
  async execute(message) {
    const url = 'https://raw.githubusercontent.com/LucianoDeveloper/memes-random/master/images.json';

    try {
      const response = await fetch(url);
      const data = await response.json();
      const randomMeme = data.images[Math.floor(Math.random() * data.images.length)];

      message.channel.send({
        embeds: [{
          image: { url: randomMeme },
          color: 0x2F3136
        }]
      });
    } catch (error) {
      console.error('Erro Ao Buscar Meme:', error);
      message.reply('Erro Ao Buscar Meme. Tente Novamente.');
    }
  }
};