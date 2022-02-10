const Discord = require("discord.js")

module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'profilepic'],
    description: 'Return a user(s) avatar picture!',
    //Use your own execute parameters
    async execute (message, args, cmd, client) {
        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size : 1024})
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor('#FF1493')

        message.channel.send(embed);
    }
}