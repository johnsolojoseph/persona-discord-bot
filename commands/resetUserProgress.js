require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = {
	resetUserProgress : async (userId) => {
		await User.updateOne({ id: userId }, { '$set': { 'personaList': [] } });
		const response = '```Reset was successful. Try "p!personas" to see a cleared list.```';

		return response;

	},
};
