const Discord = require('discord.js');
const CorsairianBot = new Discord.Client();


const PREFIX = 's>';
const fs = require('fs');

const YTDL = require("ytdl-core");

CorsairianBot.login(process.env.BOT_TOKEN);

CorsairianBot.on('message', (message) => {{
    var BotUsername = "Avatar Of Mesaphitus";
    
    //Trooper, //Corporal,  Sergeant, Staff Sergeant, Lieutenant, Colonel, General

    //Ready for action!
    
    var guild = CorsairianBot.guilds.get(`459442373517115392`);
    var allowedRole = guild.roles.find("name", "L | ENFORCER TEKK");
    var role = guild.roles.find("name", "[Subject of the Empire]");
    
    if (message.content.startsWith(PREFIX + "search")) {
        let searchwords = message.content.split(/\s+/g).slice(1);
        searchwords.join(' + ');
        message.channel.send(`https://www.google.com/search?q=${searchwords}&rlz=1C1CHZL-enUS724US724&oq=search&aqs=chrome..69i57j69i60l2j0l3.5044j0j8&sourceid=chrome&ie=UTF-8`);
    } else if(message.content.startsWith(PREFIX + "help")) {
        message.author.send("To be remade.");
    } else if(message.content.startsWith(PREFIX + "amount")) {
        const args = message.content.split(/\s+/g).slice(1);
        let role = message.mentions.roles.first();
        members = message.guild.roles.get(role.id).members; 
        message.channel.send(`${members.size} is the amount of people in this role.`);
    } else if(message.content.startsWith(PREFIX + "repeat")) {
        const args = message.content.split(/\s+/g).slice(1);
        i = 0;
        message.channel.send(args.join(" "));
    } else if (message.content.startsWith(PREFIX + "kick") && message.member.roles.has(allowedRole.id)) { //Admin Section
        let member = message.mentions.members.first();
        member.kick();
        message.channel.send("Member has been kicked.");
    } else if (message.content.startsWith(PREFIX + "ban") && message.member.roles.has(allowedRole.id)) {
        let member = message.mentions.members.first();
        member.ban();
        message.channel.send("Member has been banned.");
    } else if (message.content.startsWith(PREFIX + "purge") && message.member.roles.has(allowedRole.id)) {
        const args = message.content.split(/\s+/g).slice(1);
        let messagecount = parseInt(args[0]) + 1;
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send("Messages deleted.");
    } else if(message.content.startsWith(PREFIX + "roll")) {
        message.channel.send("You got a " + Math.floor(Math.random() * 20));
    } else if (message.content.startsWith(PREFIX + "8ball")) {
        const args = message.content.split(/\s+/g).slice(1);
        var Result = Math.floor(Math.random() * 20)
        if (Result == 0) {
            message.channel.send("It is certain.");
        } else if (Result == 1) {
            message.channel.send("It is decidedly so.");
        } else if (Result == 2) {
            message.channel.send("Without a doubt.");
        } else if (Result == 3) {
            message.channel.send("Yes definitely.");
        } else if (Result == 4) {
            message.channel.send("You may rely on it.");
        } else if (Result == 5) {
            message.channel.send("As I see it, yes.");
        } else if (Result == 6) {
            message.channel.send("Most likely.");
        } else if (Result == 7) {
            message.channel.send("Outlook good.");
        } else if (Result == 8) {
            message.channel.send("Yes.");
        } else if (Result == 9) {
            message.channel.send("Signs point to yes.");
        } else if (Result == 10) {
            message.channel.send("Reply hazy try again.");
        } else if (Result == 11) {
            message.channel.send("Ask again later.");
        } else if (Result == 12) {
            message.channel.send("Better not tell you now.");
        } else if (Result == 13) {
            message.channel.send("Cannot predict now.");
        } else if (Result == 14) {
            message.channel.send("Concentrate and ask again.");
        } else if (Result == 15) {
            message.channel.send("Don't count on it.");
        } else if (Result == 16) {
            message.channel.send("My reply is no.");
        } else if (Result == 17) {
            message.channel.send("My sources say no.");
        } else if (Result == 18) {
            message.channel.send("Outlook not so good.");
        } else if (Result == 19) {
            message.channel.send("Very doubtful.");
        } else if (Result == 20) {
            message.channel.send("You got the magic number 20! Also, my reply is no.");
        }
    } else if (message.content.startsWith(PREFIX + "either")) {
        const args = message.content.split(/\s+/g).slice(1);
        for (i = 0; i < args.length; i++) { 
            if (args[i] == "|") {
                var Border = i;
                var Chance = Math.floor(Math.random() * 2);
                if (Chance == 1) {
                    let newargs = args.slice(Border + 1);
                    message.channel.send(`I choose, ` + newargs.join(" "));
                } else {
                    let newargs = args.slice(0, Border);
                    message.channel.send(`I choose, ` + newargs.join(" "));
                }
            }
        }
    } else if (message.content.startsWith(PREFIX + "flip")) {
        var Chance = Math.floor(Math.random() * 2);
        if (Chance == 1) {
            message.channel.send("Tails.");
        } else {
            message.channel.send("Heads.");
        }
    } else if (message.content.startsWith(PREFIX + "newstats")) {
        message.channel.send("Your strength is " + Math.floor(Math.random() * 20) + ". Your dexerity is " + Math.floor(Math.random() * 20) + ". Your constituion is " + Math.floor(Math.random() * 20) + ". Your intelligence is " + Math.floor(Math.random() * 20) +". Your wisdom is " + Math.floor(Math.random() * 20) +". Your charisma is " + Math.floor(Math.random() * 20) +". Your health is " + Math.floor(Math.random() * 100));
    }

    
}})
