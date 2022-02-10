const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const { MessageFlags } = require('discord.js');
const Discord = require('discord.js');
const command_handler = require('../handlers/command_handler');

const queue = new Map();

module.exports = {
    name: 'play' ,
    aliases: ['skip', 'stop','pause','resume'],
    cooldown: 0,
    description: 'Joins and plays a video from Youtube' ,
    async execute(message, args, cmd, client) {

        const voiceChannel = message.member.voice.channel;

        const correctUrl = new Discord.MessageEmbed()
        const leavingChannel = new Discord.MessageEmbed()
        const nowPlaying = new Discord.MessageEmbed()
        const noVideos = new Discord.MessageEmbed()
        const noVoice = new Discord.MessageEmbed()
        const noPerm = new Discord.MessageEmbed()
        const noArg = new Discord.MessageEmbed()

        let correctURLtitle = 'You entered a correct URL :ok_hand:';
        correctUrl.setDescription(`${correctURLtitle}`)

        let leavingChannelMsg = 'Leaving channel :smiling_face_with_tear:';
        leavingChannel.setDescription(`${leavingChannelMsg}`)
        leavingChannel.setColor(`#992D22`)

        let noVideosMsg = 'No video results found';
        noVideos.setDescription(`${noVideosMsg}`)
        noVideos.setColor(`#7F8C8D`)

        let errorConnectingMsg = 'There was an error connecting.';
        noVideos.setDescription(`${errorConnectingMsg}`)
        noVideos.setColor(`#7F8C8D`)

        let noVoiceMsg = 'You need to be in a channel to execute this command!';
        noVoice.setDescription(`${noVoiceMsg}`)
        noVoice.setColor(`#7F8C8D`)

        let noPermMsg = 'You dont have the correct permissions';
        noPerm.setDescription(`${noPermMsg}`)
        noPerm.setColor(`#7F8C8D`)

        let noArgMsg = 'You need to send the second argument';
        noArg.setDescription(`${noArgMsg}`)
        noArg.setColor(`#7F8C8D`)

        let noSongsQueueMsg = 'There are no songs in queue.';
        noArg.setDescription(`${noSongsQueueMsg}`)
        noArg.setColor(`#7F8C8D`)

        if(!voiceChannel) return message.channel.send(noVoice);
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send(noPerm);
        if(!permissions.has('SPEAK')) return message.channel.send(noPerm);
        
        const video_player = async (guild, song) => {
            const song_queue = queue.get(guild.id);
        
            if(!song){
                song_queue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
        
            const stream = ytdl(song.url, { filter: 'audioonly' });
            song_queue.connection.play(stream, {seek: 0, volume: 0.5})
            .on('finish', () => {
                song_queue.songs.shift();
                video_player(guild, song_queue.songs[0]);
            });
        
            let nowPlayingMsg = `:thumbsup:: Now Playing ***${song.title}***`;
            nowPlaying.setDescription(`${nowPlayingMsg}`)
            nowPlaying.setColor(`#E74C3C`)
        
            await song_queue.text_channel.send(nowPlaying);
        }

        const skip_song = (message, server_queue) => {
            if(!message.member.voice.channel) return message.channel.send(noVoiceMsg);
            if(!server_queue){
                return message.channel.send(noSongsQueueMsg);
            }

            server_queue.connection.dispatcher.end();
        }

        const stop_song = (message, server_queue) =>{
            if(!message.member.voice.channel) return message.channel.send(noVoiceMsg);
            server_queue.songs = [];
            server_queue.connection.dispatcher.end();
        }


        //UPDATED
        const server_queue = queue.get(message.guild.id);
        
        if (cmd === "play"){
            if(!args.length) return message.channel.send(noArg);
            let song = {};

            if(ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            }else {
                //if the video is not a URL then use keywords to find that video.
                const video_finder = async (query) =>{
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                }else {
                    message.channel.send(noVideos);
                }
            }


            if(!server_queue){

                const queue_constructor = {
                    voice_channel: voiceChannel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
    
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                try{
                    const connection = await voiceChannel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                }catch (err){
                    queue.delete(message.guild.id);
                    message.channel.send(errorConnectingMsg);
                    throw err;
                }
            }else{
    
                let songAddedMsg = `:thumbsup: **${song.title}** added to queue! `;
                nowPlaying.setDescription(`${songAddedMsg}`)
                nowPlaying.setColor(`#E74C3C`)
    
                server_queue.songs.push(song);
                return message.channel.send(nowPlaying);
            }
    
        }
        else if (cmd === 'skip')  skip_song(message, server_queue) 
        else if (cmd === 'stop')  stop_song(message, server_queue) 
        else if (cmd === 'pause'){
            if(server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");//Checks if the song is already paused.
            server_queue.connection.dispatcher.pause();//If the song isn't paused this will pause it.
            message.channel.send("Paused the song!");//Sends a message to the channel the command was used in after it pauses.
        }
        else if(cmd === 'resume'){
            if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");//Checks if the song isn't paused.
            server_queue.connection.dispatcher.resume();//If the song is paused this will unpause it.
            message.channel.send("Unpaused the song!");//Sends a message to the channel the command was used in after it unpauses.
        }

        await Promise.reject(new Error('test'));
    }
}



