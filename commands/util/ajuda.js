const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'ajuda',
  description: 'Lista Todos Os Comandos Disponíveis.',
  async execute(message, args, client) {
    try {
      const comandosPath = path.resolve(__dirname, '../..', 'commands');
      console.log('Verificando Comandos Em:', comandosPath);

      const pastas = fs.readdirSync(comandosPath);
      const categorias = [];

      for (const pasta of pastas) {
        const pastaPath = path.join(comandosPath, pasta);
        if (!fs.lstatSync(pastaPath).isDirectory()) continue;

        const arquivos = fs.readdirSync(pastaPath).filter(file => file.endsWith('.js'));
        const comandos = [];

        for (const arquivo of arquivos) {
          const caminho = path.join(pastaPath, arquivo);
          const comando = require(caminho);
          if (comando && comando.name) {
            comandos.push(`\`${comando.name}\``);
          }
        }

        if (comandos.length > 0) {
          categorias.push({
            name: `📁 ${pasta}`,
            value: comandos.join(', ')
          });
        }
      }

      if (categorias.length === 0) {
        return message.reply('Nenhum Comando Encontrado.');
      }

      const embed = new MessageEmbed()
        .setTitle('Comandos Disponíveis')
        .setColor('BLUE')
        .addFields(categorias)
        .setFooter({ text: `Use O Prefixo " ! " O Respectivo Nome Do Comando Que Deseja Utilizar.` });
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('Erro No Comando Ajuda:', err);
      message.reply('Erro Ao Listar Os Comandos.');
    }
  }
};