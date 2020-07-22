const personasJSON = require('../data/personas');

module.exports = {
	getRandomPersona: () => {
		const randIndex = Math.floor(Math.random() * Math.floor(Object.keys(personasJSON).length));

		const personas = [];

		for(const persona in personasJSON) {
			personas.push(persona);
		}

		return personas[randIndex];
	},
};