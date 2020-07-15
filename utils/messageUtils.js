require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { randomEmbeded } = require('./embededRandomUtil');
const { InfoEmbeded } = require('./InfoUtils');


module.exports = {
	messageUtils : (message) => {
		if(message.content == 'p!encounter') {
			User.findOne({ id: message.author.id })
				.then((user)=> {
					if (user == null) {
						const newUser = new User({
							id: message.author.id,
						});

						newUser.save()
							.then(() => {
								message.channel.send('You\'re now in the database yayyyyy');
							})
							.catch((err) => console.log(err));

					}
				})
				.catch((err) => console.log(err));

			try{
				message.channel.send(randomEmbeded());
			}
			catch {
				message.channel.send('No one appeared');
			}

		}
		else if(message.content.startsWith('p!info')) {
			try {
				message.channel.send(InfoEmbeded(message.content));
			}
			catch (error) {
				message.channel.send('Info not available');
			}
		}
	},
};