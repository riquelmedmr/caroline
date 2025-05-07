module.exports = {
  name: 'clear',
  description: 'Apaga Uma Quantidade De Mensagens No Canal.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('Você Não Tem Permissão Para Usar Este Comando.');
    }

    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply('Informe Um Número Entre 1 E 100.');
    }

    try {
      await message.channel.bulkDelete(amount, true);
      const msg = await message.channel.send(`Foram Apagadas ${amount} Mensagens.`);
      setTimeout(() => msg.delete(), 3000);
    } catch (err) {
      console.error(err);
      message.reply('Erro Ao Apagar As Mensagens.');
    }
  }
};