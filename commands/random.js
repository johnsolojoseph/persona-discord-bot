const personas = require('../personas/personas');


module.exports = {
	random: () => {
		const index = Math.floor(Math.random() * Math.floor(Object.keys(personas).length));

		const list = [];
		let i = 0;
		for(const persona in personas) {
			list[i] = persona;
			i++;
		}

		return list[index];
	},
};