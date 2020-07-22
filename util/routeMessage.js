const { generateEncounter } = require('../commands/generateEncounter');
const { showPersonaInfo } = require('../commands/showPersonaInfo');
const { showPersonaInServer } = require('../commands/showPersonaInServer');
const { help } = require('../commands/help');
const { showNegotiation } = require('../commands/showNegotiation');
const { negotiate } = require('../commands/negotiate');
const { getPersonas } = require('../commands/getPersonas');
const { resetUserProgress } = require('../commands/resetUserProgress');

module.exports = {
	route : async (message) => {
		let response = '';

		// Routing command to appropriate functions
		if(message.content == 'p!encounter') {
			response = await generateEncounter(message.guild.id);
		}
		else if(message.content.startsWith('p!info')) {
			response = showPersonaInfo();
		}
		else if(message.content == 'p!help') {
			response = help();
		}
		else if (message.content == 'p!show') {
			response = await showPersonaInServer(message.guild.id);
		}
		else if(message.content == 'p!negotiate') {
			response = showNegotiation(message.guild.id);
		}
		else if(message.content.startsWith('p!negotiate')) {
			response = await negotiate(message.guild.id, message.author.id, message.content);
		}
		else if(message.content == 'p!personas') {
			response = await getPersonas(message.author.id);
		}
		else if(message.content == 'p!reset') {
			response = resetUserProgress(message.author.id);
		}

		return response;
	},
};