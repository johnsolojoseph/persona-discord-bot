require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { randomEmbeded } = require('./embededRandomUtil');
const { infoEmbeded } = require('./infoUtils');
const { showEmbeded } = require('./showUtils');
const { help } = require('../commands/help');
const { negotiateCard } = require('./negotiateCardUtil');
const { negotiateUtil } = require('./negotiateUtil');
const { personasUtil } = require('./personasUtil');
const { resetUtil } = require('./resetUtil');

module.exports = {
	messageUtils : async (message) => {
		if(message.content.startsWith('p!')) {
			User.findOne({ id: message.author.id })
				.then((user)=> {
					if (user == null) {
						const newUser = new User({
							id: message.author.id,
						});

						newUser.save()
							.then(() => {
								message.channel.send('```Seems like this is you\'re first time using our Velvet Room. We went ahead and registered your soul 👻.```');
							})
							.catch((err) => console.log(err));

					}
				})
				.catch((err) => console.log(err));
		}

		if(message.content == 'p!encounter') {

			try{
				message.channel.send(await randomEmbeded(message.guild.id));
			}
			catch {
				message.channel.send('```No one appeared```');
			}

		}
		else if(message.content.startsWith('p!info')) {
			try {
				message.channel.send(infoEmbeded(message.content));
			}
			catch (error) {
				message.channel.send('```Info not available```');
			}
		}
		else if(message.content == 'p!help') {
			message.channel.send(help());
		}
		else if (message.content == 'p!show') {
			try {
				message.channel.send(await showEmbeded(message.guild.id));
			}
			catch (err) {
				message.channel.send('```The Velvet Room is having some difficulties```');
				console.log(err);
			}
		}
		else if(message.content == 'p!negotiate') {
			try {
				message.channel.send(await negotiateCard(message.guild.id));
			}
			catch (err) {
				message.channel.send('```The Velvet Room is having some difficulties```');
				console.log(err);
			}
		}
		else if(message.content.startsWith('p!negotiate')) {
			try {

				message.channel.send(await negotiateUtil(message.guild.id, message.author.id, message.content));
			}
			catch (err) {
				message.channel.send('```The Velvet Room is having some difficulties```');
				console.log(err);
			}
		}
		else if(message.content == 'p!personas') {
			try {
				message.channel.send(await personasUtil(message.author.id));
			}
			catch (err) {
				message.channel.send('```The Velvet Room is having some difficulties```');
				console.log(err);
			}
		}
		else if(message.content == 'p!reset') {
			try {
				message.channel.send(await resetUtil(message.author.id));
			}
			catch (err) {
				message.channel.send('```The Velvet Room is having some difficulties```');
				console.log(err);
			}
		}
	},
};