module.exports = {
  name: 'ping',
  description: 'Mostra A Latência Do Bot.',
  async execute(message, args, client) {
    try {
      const msg = await message.channel.send('Calculando Ping...');
      const botLatency = msg.createdTimestamp - message.createdTimestamp;
      const apiLatency = Math.round(client.ws.ping);

      msg.edit(`🏓 **Pong**
Latência Do Bot: \`${botLatency}ms\`
Latência Da API: \`${apiLatency}ms\``);
    } catch (error) {
      console.error('Erro No Comando Ping:', error);
      message.reply('Ocorreu Um Erro Ao Calcular O Ping.');
    }
  }
};