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
	stats: {
		type: Array,
		default: [4, 3, 8, 3, 7],
	},
	level: {
		type: Number,
		default: 1,
	},
	hp:{
		type: Number,
		default: 50,
	},
	sp:{
		type: Number,
		default: 50,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	totalExp:{
		type: Number,
		default: 0,
	},
	expNeeded: {
		type: Number,
		default: 2,
	},
	cashBalance:{
		type: Number,
		default: 0,
	},
	equip: {
		type: String,
		default: '',
	},
	skill: {
		type: String,
		default: '',
	},
});

mongoose.model('users', UserSchema);