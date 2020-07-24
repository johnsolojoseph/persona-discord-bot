const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
	id: {
		type: Number,
	},
	persona: {
		type: String,
		default: '',
	},
	level: {
		type: Number,
		default: 1,
	},
	stats: {
		type: Array,
		default: [4, 3, 8, 3, 7],
	},
	hp: {
		type: Number,
		default: 50,
	},
	sp: {
		type: Number,
		default: 50,
	},
	exp:{
		type: Number,
		default: 2,
	},
	cashBalance:{
		type: Number,
		default: 0,
	},
	skills: {
		type: String,
		default: '',
	},
});

mongoose.model('servers', ServerSchema);