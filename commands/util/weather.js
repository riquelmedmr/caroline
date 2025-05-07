const fetch = require('node-fetch');

module.exports = {
  name: 'weather',
  description: 'Mostra o clima atual de uma cidade em Celsius.',
  async execute(message, args) {
    try {
      if (!args.length) {
        return message.reply('Informe O Nome Da Cidade. Ex: `!weather Brasília`');
      }

      const cidade = encodeURIComponent(args.join(' '));
      const url = `https://wttr.in/${cidade}?format=j1`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data || !data.current_condition || !data.current_condition[0]) {
        return message.reply('Cidade Não Encontrada Ou Erro Ao Obter O Clima.');
      }

      const clima = data.current_condition[0];
      const temperatura = clima.temp_C;
      const descricao = clima.weatherDesc[0].value;
      const umidade = clima.humidity;
      const vento = clima.windspeedKmph;

      let emoji = '☁️';
      if (descricao.toLowerCase().includes('sun') || descricao.toLowerCase().includes('sol')) emoji = '☀️';
      if (descricao.toLowerCase().includes('rain') || descricao.toLowerCase().includes('chuva')) emoji = '🌧️';
      if (descricao.toLowerCase().includes('storm')) emoji = '⛈️';
      if (descricao.toLowerCase().includes('snow')) emoji = '❄️';

      message.channel.send(
        `${emoji} **Clima Em ${args.join(' ')}:**\n` +
        `Temperatura: \`${temperatura}°C\`\n` +
        `Condição: \`${descricao}\`\n` +
        `Umidade: \`${umidade}%\`\n` +
        `Vento: \`${vento} km/h\``
      );
    } catch (error) {
      console.error('Erro No Comando Weather:', error);
      message.reply('Erro Ao Buscar O Clima. Tente Novamente.');
    }
  }
};