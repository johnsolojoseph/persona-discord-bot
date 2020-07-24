const Discord = require('discord.js');
const { getRandomPersona } = require('../utils/getRandomPersona.js');
const personas = require('../data/baseLimited.json');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');
require('../models/User');
const User = mongoose.model('users');
const { calcEnemyLevel } = require('../utils/levelFormulas');
const { calcExpYield } = require('../utils/expFormulas.js');
const { modStats } = require('../utils/modStats.js');


module.exports = {
	generateEncounter : async (serverId, userId) => {
		const persona = getRandomPersona();

		const user = await User.find({ id: userId });
		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const metadata = personas[persona];


		const personaEmbeded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(persona)
			.setDescription('is now in the server.')
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		await Server.deleteOne({ id: serverId })
			.catch((err) => console.log(err));

		const enemyLevel = calcEnemyLevel(user[0].level);
		const newStats = modStats(metadata.stats, 50, 50, enemyLevel);

		await Server.findOne({ id: serverId })
			.then((server)=> {


				if (server == null) {
					const newServer = new Server({
						id: serverId,
						persona: persona,
						level: enemyLevel,
						stats: newStats[0],
						exp: calcExpYield(enemyLevel),
						hp: newStats[1],
						sp: newStats[2],
						skills:  metadata.skills[0],
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