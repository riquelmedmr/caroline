const fs = require('fs');
const warns = require('../../data/warns.json');

module.exports = {
  name: 'warn',
  description: 'Avisa Um Usuário Com Um Motivo.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply('Você Não Tem Permissão.');

    const user = message.mentions.users.first();
    if (!user) return message.reply('Mencione Um Usuário.');

    const reason = args.slice(1).join(' ') || 'Sem Motivo.';
    const userId = user.id;

    if (!warns[userId]) warns[userId] = [];
    warns[userId].push({ motivo: reason, por: message.author.tag, data: new Date().toLocaleString() });

    fs.writeFileSync('./data/warns.json', JSON.stringify(warns, null, 2));
    message.channel.send(`${user.tag} Foi Avisado. Motivo: ${reason}`);
  }
};