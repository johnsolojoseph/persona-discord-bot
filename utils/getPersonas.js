require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = {
	getPersonas: async (userId) => {
		let response = '```Your list of Personas: \n\n';
		let count = 0;
		await User.findOne({ id: userId })
			.then((user) => {
				const personaList = user.personaList;
				for(const persona of personaList) {
					count++;
					response += persona + '\n';
				}
			})
			.catch(err => console.log(err));

		response += '\nYou have a total of ' + count + ' personas.```';
		return response;
	},
};
