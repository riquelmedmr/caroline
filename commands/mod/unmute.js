module.exports = {
  name: 'unmute',
  description: 'Desbloqueia Um Usuário Silenciado.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES'))
      return message.reply('Você Não Tem Permissão.');

    const user = message.mentions.members.first();
    const role = message.guild.roles.cache.find(r => r.name === 'Mutado');
    if (!user || !role || !user.roles.cache.has(role.id))
      return message.reply('Usuário Não Está Silenciado.');

    await user.roles.remove(role);
    message.channel.send(`${user.user.tag} Foi Desmutado.`);
  }
};