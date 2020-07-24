const Discord = require('discord.js');
require('../models/Server');
const mongoose = require('mongoose');
const Server = mongoose.model('servers');
require('../models/User');
const User = mongoose.model('users');
const { calcDmg } = require('../utils/calculateDmg');


module.exports = {
	attack : async (serverId, userId) => {
		let persona = '';
		let personaServer = '';
		let userStats = '';
		try {
			await Server.findOne({ id: serverId })
				.then((server) => {
					if(server == null) {
						return;
					}
					personaServer = server;
					persona = server.persona;
				})
				.catch((err) => console.log(err));

			await User.findOne({ id: userId })
				.then(user => userStats = user)
				.catch(err => console.log(err));
		}
		catch{
			return '```Server is having difficulties. Pwease beaw with us (●´ω｀●)```';
		}


		if(persona == '') {
			return '```No one is in your server...```';
		}

		if(userStats == '') {
			return '```User may not be registered```';
		}

		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const enemyDmg = calcDmg(personaServer, userStats, true);
		const userDmg = calcDmg(userStats, personaServer, false);

		let log = personaServer.persona + ' used __' + personaServer.skills + '__ and dealt a total of __' + enemyDmg + '__ damge!\n\n';

		const originalEnemyHp = personaServer.hp;
		const totalUserHp = userStats.hp - enemyDmg;
		let totalEnemyHp = personaServer.hp - userDmg;

		let userDefeated = false;

		if(totalUserHp > 0) {
			log += 'You dealt a total of __' + userDmg + '__ damage.\n\n';
			userStats.hp = totalUserHp;
			await userStats.save();
		}
		else if(totalUserHp < 0) {
			await Server.deleteOne({ id:serverId })
				.catch(err => console.log(err));
			log += 'You have been defeated. ' + personaServer.persona + ' took pity and left the server.\n\n';
			log += 'We will heal you for your next battle.\n\n';
			userStats.hp = 50;
			await userStats.save();
			totalEnemyHp = originalEnemyHp;
			userDefeated = true;
		}

		if(!userDefeated && totalEnemyHp > 0) {
			personaServer.hp = totalEnemyHp;
			await personaServer.save();
		}
		else if (!userDefeated && totalEnemyHp <= 0) {
			await Server.deleteOne({ id:serverId })
				.catch(err => console.log(err));
			log += personaServer.persona + ' has been defeated and left the server!\n\n';
			totalEnemyHp = 0;
		}

		const personaEmbeded = new Discord.MessageEmbed()
			.setColor('#ff6961')
			.setTitle(personaServer.persona)
			.setDescription('')
			.addFields(
				{ name: 'Enemy Level:', value: personaServer.level, inline: true },
				{ name: 'Enemy HP:', value: totalEnemyHp, inline: true },
				{ name: 'Enemy Skills:', value: personaServer.skills, inline: true },
			)
			.addFields(
				{ name: 'Battle Log:', value: log },
			)
			.addFields(
				{ name: 'User Level:', value: userStats.level, inline: true },
				{ name: 'User HP:', value: userStats.hp, inline: true },
				{ name: 'User MP:', value: userStats.sp, inline: true },
			)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();

		return personaEmbeded;

	},
};
