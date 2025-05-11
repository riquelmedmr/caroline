module.exports = {
  name: 'removerole',
  description: 'Remove Um Cargo De Um Usuário.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply('Você Não Tem Permissão Para Gerenciar Cargos.');
    }

    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role) {
      return message.reply('Uso Correto: `!removerole @usuário @cargo`');
    }

    try {
      await member.roles.remove(role);
      message.channel.send(`Cargo **${role.name}** Removido De ${member}.`);
    } catch (error) {
      console.error(error);
      message.reply('Erro Ao Remover O Cargo.');
    }
  }
};