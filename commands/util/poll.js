const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Cria Uma Enquete Com Reações De Voto.',
  async execute(message, args) {
    const pergunta = args.join(' ');
    if (!pergunta) return message.reply('Escreva A Pergunta Da Enquete.');

    const embed = new MessageEmbed()
      .setTitle('Enquete')
      .setDescription(pergunta)
      .setColor('#00BFFF')
      .setFooter(`Criado por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

    const pollMessage = await message.channel.send({ embeds: [embed] });
    await pollMessage.react('✅');
    await pollMessage.react('❌');
  }
};