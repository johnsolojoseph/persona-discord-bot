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
			.setDescription('wants to talk to you')
			.addFields(
				{ name: 'Level:', value: metadata.level },
				{ name: 'Arcana', value: metadata.arcana },
				{ name: 'Trait', value: metadata.trait },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;
	},
};