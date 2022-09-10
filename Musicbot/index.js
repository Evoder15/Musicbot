//Starter Code with Client
const { Client, GatewayIntentBits, Collection}=require('discord.js');
const {
	token,
} = require('./config.json');
const ytdl = require('ytdl-core'); 
const fs = require('node:fs');
const path = require('node:path');




//Create client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token);

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

console.log(command);
client.once('ready', () => {
	console.log('Ready!');
});


//listen commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});


client.login(token)