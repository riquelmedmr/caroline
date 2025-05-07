module.exports = {
  name: 'kick',
  description: 'Expulsa Um Usuário Do Servidor.',
  async execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS'))
      return message.reply('Você Não Tem Permissão Para Expulsar.');

    const user = message.mentions.members.first();
    if (!user) return message.reply('Mencione Um Usuário Válido.');

    const reason = args.slice(1).join(' ') || 'Sem Motivo.';
    await user.kick(reason);
    message.channel.send(`${user.user.tag} Foi Expulso. Motivo: ${reason}`);
  }
};