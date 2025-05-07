module.exports = {
  name: 'mute',
  description: 'Silencia Um Usuário.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES'))
      return message.reply('Você Não Tem Permissão.');

    const user = message.mentions.members.first();
    if (!user) return message.reply('Mencione Um Usuário Válido.');

    let role = message.guild.roles.cache.find(r => r.name === 'Mutado');
    if (!role) {
      role = await message.guild.roles.create({
        name: 'Mutado',
        color: '#000000',
        permissions: []
      });

      message.guild.channels.cache.forEach(async channel => {
        await channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: false,
          SPEAK: false,
          ADD_REACTIONS: false
        });
      });
    }

    await user.roles.add(role);
    message.channel.send(`${user.user.tag} Foi Silenciado.`);
  }
};