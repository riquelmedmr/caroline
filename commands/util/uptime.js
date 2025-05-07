module.exports = {
  name: 'uptime',
  description: 'Mostra Há Quanto Tempo O Bot Está Online.',
  async execute(message, args, client) {
    try {
      const totalSeconds = Math.floor(process.uptime());
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      message.channel.send(`⏱️ **Uptime Do Bot:** ${uptime}`);
    } catch (error) {
      console.error('Erro No Comando Uptime:', error);
      message.reply('Ocorreu Um Erro Ao Exibir O Uptime.');
    }
  }
};