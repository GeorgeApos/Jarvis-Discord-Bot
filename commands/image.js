const Discord = require('discord.js');

var Scrapper = require('images-scraper');

const google = new Scrapper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
    name: 'image' ,
    desciption: 'this sends an image to a discord text channel',
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()
        const image_query = args.join(' ');

        if(!image_query) return message.channel.send('Please enter an image name');

        const image_results = await google.scrape(image_query, 1);
        let imageURL = image_results[0].url;
        let imageTitle = image_query;

        embed.setTitle(`${imageTitle}`)
        embed.setImage(imageURL)
        embed.setColor(`#1ABC9C`)
        message.channel.send(embed);
    }
}