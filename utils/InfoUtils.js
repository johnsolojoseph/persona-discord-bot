const Discord = require('discord.js');
const personas = require('../personas/personas.json');


module.exports = {
	InfoEmbeded : (message) => {
		const arr = message.split(' ');
		let persona = arr[1];
		if(arr[2]) {
			persona += ' ' + arr[2];
		}
		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const metadata = personas[persona];

		const personaEmbeded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(persona)
			.setDescription('')
			.addFields(
				{ name: 'Level:', value: metadata.level, inline: true },
				{ name: 'Arcana', value: metadata.arcana, inline: true },
				{ name: 'Trait', value: metadata.trait, inline: true },
			)
			.addFields(
				{ name: 'Inherits:', value: metadata.inherits, inline: true },
				{ name: 'Item:', value: metadata.item, inline: true },
				{ name: 'ItemR', value: metadata.itemr, inline: true },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;
	},
};