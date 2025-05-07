module.exports = {
  name: 'canal',
  description: 'Bloqueia Ou Desbloqueia O Canal Atual.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Você Não Tem Permissão Para Gerenciar Canais.');
    }

    const acao = args[0]?.toLowerCase();
    if (!['bloquear', 'desbloquear'].includes(acao)) {
      return message.reply('Uso Correto: `!canal bloquear` Ou `!canal desbloquear`');
    }

    try {
      const canal = message.channel;
      const perm = canal.permissionOverwrites.resolve(message.guild.roles.everyone.id);

      if (acao === 'bloquear') {
        await canal.permissionOverwrites.edit(message.guild.roles.everyone, {
          SEND_MESSAGES: false
        });
        return message.channel.send('Canal **Bloqueado** Com Sucesso.');
      }

      if (acao === 'desbloquear') {
        await canal.permissionOverwrites.edit(message.guild.roles.everyone, {
          SEND_MESSAGES: true
        });
        return message.channel.send('Canal **Desbloqueado** Com Sucesso.');
      }
    } catch (err) {
      console.error(err);
      message.reply('Erro Ao Tentar Alterar As Permissões Do Canal.');
    }
  }
};