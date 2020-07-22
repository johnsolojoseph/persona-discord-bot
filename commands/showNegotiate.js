const Discord = require('discord.js');
const personas = require('../data/personas.json');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');


module.exports = {
	showNegotiation : async (serverId) => {
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
			.setDescription(metadata.question)
			.addFields(
				{ name: '(a)', value: metadata.a },
				{ name: '(b)', value: metadata.b },
				{ name: '(c)', value: metadata.c },
			)
			.addFields(
				{ name: 'How to reply:', value: 'Respond with p!negotiate [a or b or c] \n (i.e "p!negotiate a")' },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;

	},
};
