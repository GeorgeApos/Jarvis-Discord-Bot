const { EBADMSG } = require('constants');
const { MessageReaction } = require('discord.js');
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });


//Status Command 
client.on('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity("-help");
})


//Welcome role ston server tou souli
client.on('guildMemberAdd', async member => {
    let welcomeRole = member.guild.roles.cache.get('818766669245579265')

    await member.roles.add(welcomeRole);
    client.channels.cache.get('818767106254438411').send(`Welcome ${member} to our server. Type -help to see all the commands!`)

});


//Poll

const PREFIX = "p!";

client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

        case "poll":
            const embed = new Discord.MessageEmbed()
                .setColor(0xFFC300)
                .setTitle("Initiate Poll")
                .setDescription("p!poll <text> to initiate a simple yes or no poll.");

            if (!args[1]) {
                message.channel.send(embed);
                break;
            }

            let msgArgs = args.slice(1).join(" ");

            const NewEmbed = new Discord.MessageEmbed()
                .setColor(0xFFC300)
                .setDescription(":clipboard: " + "**" + msgArgs + "**");

            message.channel.send(NewEmbed).then(MessageReaction => {
                MessageReaction.react("👍");
                MessageReaction.react("👎");
                message.delete(1000).catch(console.error);
            });
        break;
    }


});



//TROPOS GIA NA KANEIS TO REACT SE SUGKEKRIMENO MESSAGE SE SUGKEKRIMENO SERVER
//
// client.on('ready', async () => {
//     await client.channels.cache.get('824063976525660191').messages.fetch('824417952689422346');
//     console.log('cached');
// });

// client.on("message", (message) => {
//     if(message.content === 'test'){
//         const messageEmbed = new Discord.MessageEmbed()
//         .setTitle('What are you playing?')
//         .setDescription('React to an emoji to take the role.\n' 
//         + '🐲 = Dungeons And Dragons' 
//         + '\n' + '🛡 = Destiny 2'
//         + '\n' + '⛏ = Minecraft'
//         + '\n' + '🖱 = League Of Legends')

//         message.channel.send(messageEmbed).then(embedMessage => {
//             embedMessage.react('🐲');
//             embedMessage.react('🛡');
//             embedMessage.react('⛏');
//             embedMessage.react('🖱');
//         });
//     }
// });

// client.on('messageReactionAdd', async (reaction, user) => {
//     const dndRole = reaction.message.guild.roles.cache.get('824006482127224863');
//     const destinyRole = reaction.message.guild.roles.cache.get('819145423695904799');
//     const minecraftRole = reaction.message.guild.roles.cache.get('819117882771898399');
//     const leagueRole = reaction.message.guild.roles.cache.get('824416181074657299');

//     if (reaction.message.id === '824417952689422346') {
//         if(reaction.emoji.name === '🐲'){
//             const reactionMember = reaction.message.guild.members.cache.get(user.id);
//             await reactionMember.roles.add(dndRole);
//         }else if(reaction.emoji.name === '🛡'){
//             const reactionMember = reaction.message.guild.members.cache.get(user.id);
//             await reactionMember.roles.add(destinyRole);
//         }else if(reaction.emoji.name === '⛏'){
//             const reactionMember = reaction.message.guild.members.cache.get(user.id);
//             await reactionMember.roles.add(minecraftRole);
//         }else if (reaction.emoji.name === '🖱'){
//             const reactionMember = reaction.message.guild.members.cache.get(user.id);
//             await reactionMember.roles.add(leagueRole);
//         }
//     }
// });

// client.on('messageReactionRemove', async (reaction, user) => {
//     const dndRole = reaction.message.guild.roles.cache.get('824006482127224863');
//     const destinyRole = reaction.message.guild.roles.cache.get('819145423695904799');
//     const minecraftRole = reaction.message.guild.roles.cache.get('819117882771898399');
//     const leagueRole = reaction.message.guild.roles.cache.get('824416181074657299');

//         if (reaction.message.id === '824417952689422346') {
//             if(reaction.emoji.name === '🐲'){
//                 const reactionMember = reaction.message.guild.members.cache.get(user.id);
//                 await reactionMember.roles.remove(dndRole);
//             }else if(reaction.emoji.name === '🛡'){
//                 const reactionMember = reaction.message.guild.members.cache.get(user.id);
//                 await reactionMember.roles.remove(destinyRole);
//             }else if(reaction.emoji.name === '⛏'){
//                 const reactionMember = reaction.message.guild.members.cache.get(user.id);
//                 await reactionMember.roles.remove(minecraftRole);
//             }else if (reaction.emoji.name === '🖱'){
//                 const reactionMember = reaction.message.guild.members.cache.get(user.id);
//                 await reactionMember.roles.remove(leagueRole);
//         }
//     }
// });

const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})



client.login(CLIENT_LOGIN);

