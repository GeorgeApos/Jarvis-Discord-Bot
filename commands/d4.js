const Discord = require('discord.js');
const randomInt = require('random-int');
 
module.exports = {
    name: 'd4',
    aliases: ['d6', 'd8', 'd10', 'd12', 'd20', 'd100'],
    description: "this is a d4 dnd command",
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()

        if(cmd === 'd4'){
            let embedMsg = randomInt(1,4);

            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)

            message.channel.send(embed);
        }else if (cmd === 'd6') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,6);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }
        else if (cmd === 'd8') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,8);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }
        else if (cmd === 'd10') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,10);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }
        else if (cmd === 'd12') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,12);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }
        else if (cmd === 'd20') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,20);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }
        else if (cmd === 'd100') {
            const embed = new Discord.MessageEmbed()

            let embedMsg = randomInt(1,100);
    
            embed.setDescription(`${embedMsg}`)
            embed.setColor(`#FFFF00`)
    
            message.channel.send(embed);
        }

    }
}