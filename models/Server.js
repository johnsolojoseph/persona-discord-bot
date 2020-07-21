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
});

mongoose.model('servers', ServerSchema);