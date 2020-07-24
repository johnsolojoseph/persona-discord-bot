require('../models/User');
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = {
	resetUserProgress : async (userId) => {
		await User.deleteOne({ id: userId });

		const user = new User({
			id: userId,
		});

		await user.save();

		const response = '```Reset was successful!```';

		return response;

	},
};
