const Discord = require('discord.js');
 
module.exports = {
    name: 'help',
    description: "this is a help command",
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()

        let embedMsg = '**-alive** : checks if the bot is woking' + '\n'
                    + '**-dndstats** : shows 6 stats for your dnd character' + '\n'
                    + '**-d4 to -d100** : rolls a dice from 4 to 100' +'\n'
                    + '**-play, -skip, -leave, -pause, -resume** : basic music bot commands' + '\n'
                    + '**-meme**: sends a random meme from r/meme' + '\n'
                    + '**-ping and -pong**: try it yourself' + '\n'
                    + '**-remind <time> <name>**: sends you a reminder in a private message' + '\n'
                    + '**-weather** : sends you information about weather' + '\n'
                    + '**p!poll <text>**: creates a poll';

        let embedTitle = 'Jarvis Commands';

        embed.setTitle(`${embedTitle}`)
        embed.setDescription(`${embedMsg}`)
        embed.setColor(`#4B0082`)

        message.channel.send(embed);
    }
}