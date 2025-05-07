module.exports = {
  name: 'say',
  description: 'Faz O Bot Repetir A Mensagem Informada.',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Uso Correto: `!say Mensagem Que Deseja Que O Bot Envie`');
    }

    const texto = args.join(' ');

    try {
      await message.delete();
      message.channel.send(texto);
    } catch (err) {
      console.error('Erro Ao Executar O Comando Say:', err);
      message.reply('Erro Ao Enviar A Mensagem.');
    }
  }
};