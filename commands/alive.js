const Discord = require('discord.js');
 
module.exports = {
    name: 'alive',
    description: "testcommand",
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()

        embed.setDescription(`Still breathin'`)
        embed.setColor(`#2ECC71`)

        message.channel.send(embed);
    }
}