const Discord = require('discord.js');

module.exports = {
    name: 'pong',
    description: "this is a counter-ping command!",
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()

        let embedMsg = 'ping! :yum:';
        embed.setDescription(`${embedMsg}`)
        embed.setColor(`#FFFF00`)

        message.channel.send(embed);
    }
}