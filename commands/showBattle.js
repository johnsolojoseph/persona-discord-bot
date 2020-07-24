const Discord = require('discord.js');
const personas = require('../data/personas.json');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');


module.exports = {
	showBattle : async (serverId) => {
		let persona = '';
		let personaServer = '';
		await Server.findOne({ id: serverId })
			.then((server) => {
				if(server == null) {
					return '```No one is in your server...```';
				}
				personaServer = server;
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
			.setDescription('is ready to battle')
			.addFields(
				{ name: 'Level:', value: personaServer.level, inline: true },
				{ name: 'Hp', value: personaServer.hp, inline: true },
				{ name: 'Skill:', value: personaServer.skills, inline: true },
			)
			.addFields(
				{ name: 'Battle Commands:', value: 'p!attack' },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;

	},
};
