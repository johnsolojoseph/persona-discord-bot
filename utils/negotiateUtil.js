const personas = require('../personas/personas.json');
require('../models/Server');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Server = mongoose.model('servers');
const Discord = require('discord.js');


module.exports.negotiateUtil =

	async (serverId, userId, msg) => {
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


		const metadata = personas[persona];

		const answer = msg.split(' ', 2);

		let response = '"' + metadata.question + '" \n\n';
		response += 'You responded with (' + answer[1] + ') "';

		if(answer[1] == 'a') {
			response += metadata.a;
		}
		else if(answer[1] == 'b') {
			response += metadata.b;
		}
		else if(answer[1] == 'c') {
			response += metadata.c;
		}
		else {
			response += '(This is invalid. Please choose from a, b, or c)';
		}

		response += '"\n\n';

		if(answer[1] == metadata.correct) {
			await User.findOne({ id: userId })
				.then((user) => {
					const personaList = user.personaList;
					if(personaList.includes(persona)) {
						response = 'You already have this persona!';
					}
					else {
						user.personaList.push(persona);
						user.save();
						response += 'Congratulations! ' + persona + ' liked your answer and will be joining your party! \n';
					}
				})
				.catch((err) => {console.log(err);});
		}
		else {
			response += persona + ' didn\'t seem to like your answer \n\n';
			response += 'Negotiation was unsuccesful.. Try again';
		}

		let photoIndex = persona;
		photoIndex = photoIndex.split(' ').join('');

		const personaEmbeded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(persona)
			.setDescription(response)
			.setImage('https://storage.googleapis.com/persona-discord-bot/' + photoIndex + '.png')
			.setTimestamp();


		return personaEmbeded;

	};