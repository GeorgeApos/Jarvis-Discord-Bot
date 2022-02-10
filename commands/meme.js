const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme' ,
    desciption: 'sends a meme from a subreddit',
    async execute(message, args, cmd, client){
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeComments = content[0].data.children[0].data.num_comments;

            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor(`#2ECC71`)
            embed.setFooter(` 👍 ${memeUpvotes}  👎 ${memeDownvotes} 💬 ${memeComments}`)
            message.channel.send(embed);
        })
    }
}