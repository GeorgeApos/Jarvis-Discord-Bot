const Discord = require('discord.js');
const randomInt = require('random-int');
 
module.exports = {
    name: 'dndstats',
    description: "this is a dnd stats command",
    async execute(message, args, cmd, client){

        var stringDnD = '';

        for(var i = 1; i <= 6; i++){

            const embed = new Discord.MessageEmbed()
            
            x = randomInt(1,6);
            y = randomInt(1,6);
            z = randomInt(1,6);
            k = randomInt(1,6);

            //WARNING: It is TERRIBLE.
            if(x < y){
              var low1 = x;
              var high1 = y;
            }else{
              var low1 = y;
              var high1 = x;
            }

            if(z < k){
              var low2 = z;
              var high2 = k;
            }else{
              var low2 = k;
              var high2 = z;
            }

            if(low1 < low2){
              var lowest = low2;
              var middle1 = low1;
            }else{
              lowest = low2;
              middle1 = low1;
            }

            if(high1 > high2){
              var highest = high1;
              var middle2 = high2;
            }else{
              var highest = high2;
              var middle2 = high1;
            }

            var sum = highest + middle1 + middle2;
            sumString = sum.toString();

            stringDnD += sumString + ' ';

            if(i===6){
                embed.setTitle('DnD Stats')
                embed.setDescription(`${stringDnD}`)
                embed.setColor(`#ff4d4d`)
                message.channel.send(embed);
              break;
            }

        }


    }
}