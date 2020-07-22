const Discord = require('discord.js');
const { getRandomPersona } = require('./getRandomPersona.js');
const personas = require('../personas/personas.json');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');


module.exports = {
	generateEncounter : async (serverId) => {
		const persona = getRandomPersona();

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

		await Server.deleteOne({ id: serverId })
			.catch((err) => console.log(err));


		await Server.findOne({ id: serverId })
			.then((server)=> {
				if (server == null) {
					const newServer = new Server({
						id: serverId,
						persona: persona,
					});

					newServer.save()
						.catch((err) => console.log(err));

				}
				else {
					const update = { persona : persona };
					server.updateOne(update);
				}
			})
			.catch((err) => console.log(err));

		return personaEmbeded;
	},
};