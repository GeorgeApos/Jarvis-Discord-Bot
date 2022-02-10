const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    async execute(message, args, cmd, client) {
    
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results

        const errorConst = new Discord.MessageEmbed()
        errorConst.setDescription(`Missing search input`)
        errorConst.setColor(0x111111)
        if(error) return message.channel.send(errorConst);

        const specifyLocation = new Discord.MessageEmbed()
        specifyLocation.setDescription(`Please specify a location`)
        specifyLocation.setColor(0x111111)
        if(!args[0]) return message.channel.send(specifyLocation)

        const invalidLocation = new Discord.MessageEmbed()
        invalidLocation.setDescription(`**Invalid** location`)
        invalidLocation.setColor(0x111111)
        if(result === undefined || result.length === 0) return message.channel.send(invalidLocation);

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}