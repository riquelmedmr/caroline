module.exports = {
  name: 'ban',
  description: 'Bane Um Usuário Do Servidor.',
  async execute(message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS'))
      return message.reply('Você Não Tem Permissão Para Banir.');

    const user = message.mentions.members.first();
    if (!user) return message.reply('Mencione Um Usuário Válido.');

    const reason = args.slice(1).join(' ') || 'Sem Motivo.';
    await user.ban({ reason });
    message.channel.send(`${user.user.tag} Foi Banido. Motivo: ${reason}`);
  }
};