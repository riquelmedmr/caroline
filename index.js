require('dotenv').config(); 

const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.MESSAGE_CONTENT
  ]
});

client.commands = new Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.name && command.execute) {
      client.commands.set(command.name, command);
      console.log(`Comando Carregado: ${command.name}`);
    }
  }
}

client.once('ready', () => {
  console.log(`Bot Online: ${client.user.tag}`);
  client.user.setActivity('prefix " ! " created by riquelmedmr.', { type: 'LISTENING' });
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('Erro Ao Executar O Comando.');
  }
});

client.login(process.env.TOKEN);