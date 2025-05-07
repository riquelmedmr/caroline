const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'calculate',
  description: 'Realiza Cálculos Matemáticos Simples (Soma, Subtração, Multiplicação, Divisão).',
  async execute(message, args) {
    try {
      if (!args.length) {
        return message.reply('Por Favor, Forneça Uma Expressão Matemática. Exemplo: !calculate 2 + 3: !calculate 10 - 4: !calculate 5 * 3: !calculate 12 / 4');
      }

      const expression = args.join(' ');

      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        return message.reply('Expressão Inválida. Use Apenas Números E Operadores (+, -, *, /)');
      }

      const result = eval(expression);

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Resultado Do Cálculo')
        .setDescription(`**Expressão:** ${expression}\n**Resultado:** ${result}`)
        .setFooter('Bot Criado Por riquelmedmr.');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erro No Comando Calculate:', error);
      message.reply('Erro Ao Calcular A Expressão. Tente Novamente.');
    }
  }
};