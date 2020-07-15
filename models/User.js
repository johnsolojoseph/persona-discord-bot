const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	id: {
		type: Number,
	},
	personaList: {
		type: Array,
		default: [],
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

mongoose.model('users', UserSchema);