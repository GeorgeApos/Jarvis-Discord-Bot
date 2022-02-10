const { execute } = require("./play");
const Discord = require('discord.js');

module.exports = {
    name: 'leave' ,
    desciption: 'stop the bot and leave the channel',
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()
        const voiceChannel = message.member.voice.channel;
        
        let embedMsg = 'Leaving channel :smiling_face_with_tear:';
        embed.setDescription(`${embedMsg}`)
        embed.setColor(`#992D22`)


        if(!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        await voiceChannel.leave()
        await message.channel.send(embed)
    }
}