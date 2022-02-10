const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()

        let embedMsg = 'pong!';
        embed.setDescription(`${embedMsg}`)
        embed.setColor(`#FFFF00`)

        message.channel.send(embed);
    }
}