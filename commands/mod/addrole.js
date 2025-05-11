module.exports = {
  name: 'addrole',
  description: 'Adiciona Um Cargo A Um Usuário.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply('Você Não Tem Permissão Para Gerenciar Cargos.');
    }

    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role) {
      return message.reply('Uso Correto: `!addrole @usuário @cargo`');
    }

    try {
      await member.roles.add(role);
      message.channel.send(`Cargo **${role.name}** Adicionado A ${member}.`);
    } catch (error) {
      console.error(error);
      message.reply('Erro Ao Adicionar O Cargo.');
    }
  }
};