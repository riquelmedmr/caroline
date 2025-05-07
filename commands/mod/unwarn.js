const fs = require('fs');
const warns = require('../../data/warns.json');

module.exports = {
  name: 'unwarn',
  description: 'Remove Um Aviso De Um Usuário.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply('Você Não Tem Permissão.');

    const user = message.mentions.users.first();
    if (!user || !warns[user.id] || warns[user.id].length === 0)
      return message.reply('Este Usuário Não Possui Avisos.');

    warns[user.id].pop();

    fs.writeFileSync('./data/warns.json', JSON.stringify(warns, null, 2));
    message.channel.send(`Último Aviso De ${user.tag} Foi Removido.`);
  }
};