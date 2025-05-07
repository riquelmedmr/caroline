module.exports = {
  name: 'slowmode',
  description: 'Define O Tempo De Modo Lento No Canal Atual.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Você Não Tem Permissão Para Usar Este Comando.');
    }

    const tempo = parseInt(args[0], 10);

    if (isNaN(tempo) || tempo < 0 || tempo > 21600) {
      return message.reply('Uso Correto: `!slowmode segundos`\nO Valor Deve Estar Entre 0 E 21600 Segundos (6 Horas).');
    }

    try {
      await message.channel.setRateLimitPerUser(tempo);
      message.channel.send(`✅ Modo Lento Definido Para \`${tempo}\` Segundos.`);
    } catch (err) {
      console.error('Erro ao definir slowmode:', err);
      message.reply('Erro Ao Aplicar O Modo Lento.');
    }
  }
};