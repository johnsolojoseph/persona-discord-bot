require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { route } = require('../routes/routeMessage.js');

module.exports = {
	execute : async (message) => {

		const user = await User.findOne({ id: message.author.id });

		try {
			if(message.content.startsWith('p!') && user == null) {
				const newUser = new User({
					id: message.author.id,
				});

				await newUser.save();

				const msg = '```We see you haven\t registered yet. We put your soul in the Velvet Room 👻```.';
				message.channel.send(msg)
					.catch(err => console.log(err));
			}
			else if (message.content.startsWith('p!')) {
				let response = 'Nothing happened.';

				response = await route(message);

				message.channel.send(response)
					.catch(err => console.log(err));
			}
			else {
				return;
			}
		}
		catch {
			message.channel.send('```Server is having difficulties```')
				.catch(err => console.log(err));
		}


	},
};