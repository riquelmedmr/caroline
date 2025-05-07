const ms = require('ms');

module.exports = {
  name: 'timeout',
  description: 'Aplica Um Timeout Em Um Usuário Por Um Tempo Definido.',
  async execute(message, args) {
    if (!message.member.permissions.has('MODERATE_MEMBERS')) {
      return message.reply('Você Não Tem Permissão Para Usar Este Comando.');
    }

    const user = message.mentions.members.first();
    const time = args[1];
    const reason = args.slice(2).join(' ') || 'Sem motivo';

    if (!user || !time) {
      return message.reply("return message.reply('Uso Correto: `!timeout @usuário 10m Motivo`');");
    }

    if (!user.moderatable || user.id === message.author.id) {
      return message.reply('Não Posso Aplicar Timeout Nesse Membro.');
    }

    const duration = ms(time);
    if (!duration || duration > 2.419e9) { // 28 dias em ms
      return message.reply('Tempo Inválido. Máximo Permitido: 28 Dias.');
    }

    try {
      await user.timeout(duration, reason);
      message.channel.send(`✅ ${user} foi silenciado por \`${ms(duration, { long: true })}\`.\nMotivo: ${reason}`);
    } catch (err) {
      console.error(err);
      message.reply('Erro Ao Aplicar Timeout.');
    }
  }
};