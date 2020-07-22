const { generateEncounter } = require('../commands/encounter');
const { showPersonaInfo } = require('../commands/info');
const { showPersonaInServer } = require('../commands/show');
const { help } = require('../commands/help');
const { showNegotiation } = require('../commands/showNegotiate');
const { negotiate } = require('../commands/negotiate');
const { getPersonas } = require('../utils/getPersonas');
const { resetUserProgress } = require('../commands/reset');

module.exports = {
	route : async (message) => {
		let response = '';
		try{
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
		}
		catch{
			response = '```Server is having difficulties```';
			console.error('Message routing failed. Server Error 500');
		}


		return response;
	},
};