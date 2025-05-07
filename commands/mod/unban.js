module.exports = {
  name: 'unban',
  description: 'Desbane Um Usuário Pelo ID Ou Menção.',
  async execute(message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('Você Não Tem Permissão Para Usar Este Comando.');
    }

    const input = args[0];
    const reason = args.slice(1).join(' ') || 'Sem Motivo';

    if (!input) {
      return message.reply('Uso Correto: `!unban @usuário` Ou `!unban ID Do Usuário Motivo(opcional)`');
    }

    const userId = input.replace(/[<@!>]/g, '');

    try {
      const bans = await message.guild.bans.fetch();
      const bannedUser = bans.get(userId);

      if (!bannedUser) {
        return message.reply('Esse Usuário Não Está Banido Ou O ID Está Incorreto.');
      }

      await message.guild.members.unban(userId, reason);
      message.channel.send(`✅ Usuário \`${bannedUser.user.tag}\` foi Desbanido.\nMotivo: ${reason}`);
    } catch (err) {
      console.error('Erro Ao Desbanir:', err);
      message.reply('Erro Ao Tentar Desbanir O Usuário.');
    }
  }
};