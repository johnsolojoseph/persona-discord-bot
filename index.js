require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;

const TOKEN = process.env.TOKEN;
const MONGO_URI = process.env.MONGO_URI;

const { execute } = require('./controllers/messageController');

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then('MongoDB Connected...')
	.catch(err => console.log(err));

bot.login(TOKEN);

bot.on('message', message => {
	execute(message);
});

app.listen(port, () => console.log(`The magic is happening at http://localhost:${port}`));