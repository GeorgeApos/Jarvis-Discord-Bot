const ms = require('ms')
const Discord = require('discord.js');

module.exports = {
    name: "remind",
    category: "utility",
    description:{
        usage: "remind <time> <reminder>",
        content:  "Helps remind you something",
    },
    async execute(message, args, cmd, client) {
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
        notime.setColor('#F30B04')
        notime.setDescription(`**Please specify the time!**`)

        const wrongtime = new Discord.MessageEmbed()
        wrongtime.setColor('#F30B04')
        wrongtime.setDescription(`**Sorry I only do d, m, h, or s.**`)

        const reminderembed = new Discord.MessageEmbed()
        reminderembed.setColor('#F30B04')
        reminderembed.setDescription(`**Please tell me what you want to be reminded off**`)

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&   
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )


            return message.channel.send(wrongtime)
        if (!reminder) return message.channel.send(reminderembed)

        const remindertime = new Discord.MessageEmbed()
        .setColor('#33F304')
        .setDescription(`\**Your reminder will go off in ${time}**`)

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle('**REMINDER**')
        .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)  

        setTimeout(async function () {
           try{

            await user.send(reminderdm)
           }catch(err){

           } 
           
        }, ms(time));
    }
}