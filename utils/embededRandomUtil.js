const Discord = require('discord.js');
const { random } = require('../commands/random.js');
const personas = require('../personas/personas.json');


module.exports = {
	randomEmbeded : () => {
		const persona = random();
		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const metadata = personas[persona];

		const personaEmbeded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(persona)
			.setDescription('is now in the server.')
			.addFields(
				{ name: 'Level:', value: metadata.level, inline: true },
				{ name: 'Arcana', value: metadata.arcana, inline: true },
				{ name: 'Trait', value: metadata.trait, inline: true },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;
	},
};