require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { route } = require('../util/routeMessage.js');

module.exports = {
	execute : async (message) => {

		const user = await User.findOne({ id: message.author.id });

		try {
			if(message.content.startsWith('p!') && user == null) {
				const newUser = new User({
					id: message.author.id,
				});

				await newUser.save();
			}
			else if (message.content.startsWith('p!')) {
				let response = '';

				response = route(message);

				message.channel.send(response);
			}
			else {
				return;
			}
		}
		catch {
			message.channel.send('```The Velvet Room is having some technical difficulties```');
		}


	},
};