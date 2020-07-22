const Discord = require('discord.js');
const personas = require('../personas/personas.json');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');


module.exports = {
	showPersonaInServer : async (serverId) => {
		let persona = '';
		await Server.findOne({ id: serverId })
			.then((server) => {
				if(server == null) {
					return '```No one is in your server...```';
				}
				persona = server.persona;
			})
			.catch((err) => console.log(err));

		if(persona == '') {
			return '```No one is in your server...```';
		}

		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const metadata = personas[persona];

		let skills = '';
		for(const skill in metadata.skills) {
			skills += skill + ', ';
		}

		skills = skills.substring(0, skills.length - 2);

		if (skills == null) {
			skills = 'No skills';
		}

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
				{ name: 'Skills:', value: skills, inline: true },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;

	},
};
