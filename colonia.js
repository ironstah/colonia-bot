const Discord = require('discord.js');
const VerificationJSON = `./VerificationCode.json`;
const PrestigeJSON = `./Data.json`;
let Prestige = require(PrestigeJSON);
let Code = require(VerificationJSON);
const CorsairianBot = new Discord.Client();


const PREFIX = '!';
const fs = require('fs');

//const YTDL = require("ytdl-core");
var roblox = require("roblox-js");
var servers = {};
var groupId = 2736265;
var maxrank = 7;

var cooldown = new Set();
var cdsec = 5;

CorsairianBot.login(process.env.BOT_TOKEN);

CorsairianBot.on('message', (message) => {{
    var BotUsername = "Avatar Of Mesaphitus";
    let PrestigeAdd = Math.floor(Math.random() * 1);
    var NextLevelArray = [100, 300, 700, 1000, 3000, 9999999999];
    //Trooper, //Corporal,  Sergeant, Staff Sergeant, Lieutenant, Colonel, General

    //Ready for action!
    
    var guild = CorsairianBot.guilds.get(`459442373517115392`);
    var allowedRole = guild.roles.find("name", "[-] Moderator Role");
    var role = guild.roles.find("name", "[-] Member Role");
    if (message.content.startsWith("!verify")) { 
        Code[message.author.username] = {
            ID: message.author.id,
            Code: `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}` + `${Math.floor(Math.random() * 9)}`
        }
        message.author.send(`Here's your verification code: ${Code[message.author.username].Code} \nType Use the code by going to: https://www.roblox.com/games/2108162131/Verification-Center-VERIFY#!/about`);
       
    } else if (message.author.username == "Verification Bot") {
        const args = message.content.split(/\s+/g).slice(1);
        let VerificationCode = args[2];
        let RBLXUsername = message.content.replace(/ .*/,'');
        var results = fs.readFileSync(VerificationJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].Code == VerificationCode) {
                 Prestige[parsedResults[i].ID] = {
                    Points: 0,
                    Role: "Recruit",
                    ROBLOXUsername: RBLXUsername,
                    Rank: 1,
                    NextLevel: NextLevelArray[0],
                    Warnings: 0,
                    Bans: 0,
                    Kicks: 0,
                }
                
                CorsairianBot.channels.get(`459448454008274946`).send(`${RBLXUsername} has been verified. Type !confirm to get your role.`);
                message.guild.members.get(`${parsedResults[i].ID}`).setNickname(`[E1] ${RBLXUsername}`);
            }
        }
    } else if (message.author.username == "Advancement Bot") {
        let RBLXUsername = message.content.replace(/ .*/,'');
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == RBLXUsername) {
                parsedResults[i].Points = 100;
            }
        }
    }
    if (message.content.startsWith(PREFIX + "search")) {
        let searchwords = message.content.split(/\s+/g).slice(1);
        searchwords.join(' + ');
        message.channel.send(`https://www.google.com/search?q=${searchwords}&rlz=1C1CHZL-enUS724US724&oq=search&aqs=chrome..69i57j69i60l2j0l3.5044j0j8&sourceid=chrome&ie=UTF-8`);
    } else if(message.content.startsWith(PREFIX + "help")) {
        message.author.send("\n!search [sentence] - A google search link is posted. \n!amount [role] - The amount of people in the role is posted. \n!repeat [sentence] - The sentence is repeated. \n!kick [member] - The member is kicked. \n!ban [member] - The member is banned. \n!purge [number] - The amount of messages are deleted. \n!play [youtube link] - The youtube link's audio is played in a voice channel. \n!stopmusic - Stops current music. \n!skipmusic - Skips the music in the current queue. \n!roll - A dice roll is made between 1-100. \n!8ball - An 8ball answer is choosen. \n!either [option1] | [option2] - An option between the 2 is chosen. \n!flip - A coin flip is made. \n!newstats - New stats are made randomly.");
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

    if(message.channel.name == "add-data" && message.content.startsWith(PREFIX + "add-prestige")) {
        let args = message.content.split(/\s+/g).slice(1);
        let name = args[0];
        let add = args[1];
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == name) {
                message.channel.send("Added Prestige."); 
                Prestige[i].Points = Prestige[i].Points + parseInt(add);
            }
        }
    } else if (message.channel.name == "add-data" && message.content.startsWith(PREFIX + "add-warnings")) {
        let args = message.content.split(/\s+/g).slice(1);
        let name = args[0];
        let add = args[1];
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == name) {
                message.channel.send("Added Warnings."); 
                Prestige[i].Warnings = Prestige[i].Warnings + parseInt(add);
            }
        }
    } else if (message.channel.name == "add-data" && message.content.startsWith(PREFIX + "add-kicks")) {
        let args = message.content.split(/\s+/g).slice(1);
        let name = args[0];
        let add = args[1];
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == name) {
                message.channel.send("Added Kicks."); 
                Prestige[i].Kicks = Prestige[i].Kicks + parseInt(add);
            }
        }
    } else if (message.channel.name == "add-data" && message.content.startsWith(PREFIX + "add-bans")) {
        let args = message.content.split(/\s+/g).slice(1);
        let name = args[0];
        let add = args[1];
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == name) {
                message.channel.send("Added Bans."); 
                Prestige[i].Bans = Prestige[i].Bans + parseInt(add);
            }
        }
    } else if (message.channel.name == "add-data" && message.content.startsWith(PREFIX + "demote")) {
        let args = message.content.split(/\s+/g).slice(1);
        let name = args[0];
        var results = fs.readFileSync(PrestigeJSON, 'utf8');
        var parsedResults = JSON.parse(results);
        for ( var i in parsedResults ) {
            if (parsedResults[i].ROBLOXUsername == name && parsedResults[i].Rank != 1) {
                message.channel.send("Demoting..."); 
                let username = parsedResults[i].ROBLOXUsername;
                roblox.login({username: "MesaphitusIncarnate", password: process.env.ROBLOXPASS}).then((success) => {

                }).catch(() => {console.log("Failed to login.");});
                
                if (username){
                    message.channel.send(`Checking ROBLOX for ${username}`)
                    roblox.getIdFromUsername(username)
                    
                    .then(function(id){
                        roblox.getRankInGroup(groupId, id)
                        .then(function(rank){
                            if(maxrank <= rank){
                                CorsairianBot.channels.get(`474059084753010718`).send(`${id} is rank ${rank} and not demotable.`);
                            } else {
                                CorsairianBot.channels.get(`474059084753010718`).send(`${id} is rank ${rank} and demotable.`);
                                roblox.demote(groupId, id)
                                .then(function(roles){
                                    message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`);
                                }).catch(function(err){
                                    message.channel.send("Failed to demote.");
                                });
                            }
                        }).catch(function(err){
                            CorsairianBot.channels.get(`474059084753010718`).send("Couldn't get player in the group.");
                        });
                    }).catch(function(err){ 
                        CorsairianBot.channels.get(`474059084753010718`).send(`Sorry, but ${username} doesn't exist on ROBLOX.`);
                    });
                } else {
                    CorsairianBot.channels.get(`474059084753010718`).send("Failed to demote.");
                }
                parsedResults[i].Rank = parsedResults[i].Rank - 1;
                var CurrentRank = parsedResults[i].Rank;
                console.log(CurrentRank);
                if (CurrentRank == 1) {
                    parsedResults[i].Points = 0;
                } else {
                    parsedResults[i].Points = NextLevelArray[CurrentRank-2] + 10;
                }
                
                parsedResults[i].NextLevel = NextLevelArray[parsedResults[i].Rank];
                if (CurrentRank == 1) {
                    parsedResults[i].Role = "Recruit";
                    message.guild.members.get(i).setNickname(`[E1] ${parsedResults[i].ROBLOXUsername}`);
                } else if (CurrentRank == 2) {
                    parsedResults[i].Role = "Trooper";
                    message.guild.members.get(i).setNickname(`[E2] ${parsedResults[i].ROBLOXUsername}`);
                } else if (CurrentRank == 3) {
                    parsedResults[i].Role = "Corporal";
                    message.guild.members.get(i).setNickname(`[E3] ${parsedResults[i].ROBLOXUsername}`);
                } else if (CurrentRank == 4) {
                    parsedResults[i].Role = "Sergeant";
                    message.guild.members.get(i).setNickname(`[E4] ${parsedResults[i].ROBLOXUsername}`);
                } else if (CurrentRank == 5) {
                    parsedResults[i].Role = "Staff  Sergeant";
                    message.guild.members.get(i).setNickname(`[E5] ${parsedResults[i].ROBLOXUsername}`);
                }
            }
        }
    } else if (message.author.username != BotUsername && Prestige[message.author.id]) {
        var CurrentPrestige = Prestige[message.author.id].Points;
        var CurrentRank = Prestige[message.author.id].Rank;
        var NextLevel = Prestige[message.author.id].NextLevel;
        var Role = Prestige[message.author.id].Role;
        
        Prestige[message.author.id].Points = CurrentPrestige + PrestigeAdd;
        //console.log(Prestige[message.author.id].Rank);

        if (CurrentPrestige >= NextLevel && CurrentPrestige <= 999999) {
            var RBLXUsername = Prestige[message.author.id].RBLXUsername;

            Prestige[message.author.id].NextLevel = NextLevelArray[Prestige[message.author.id].Rank];
            Prestige[message.author.id].Rank = Prestige[message.author.id].Rank + 1;    
            let CurrentRank = Prestige[message.author.id].Rank;
            if (CurrentRank != 5) {
                let username = Prestige[message.author.id].ROBLOXUsername;
                roblox.login({username: "MesaphitusIncarnate", password: process.env.ROBLOXPASS}).then((success) => {

                }).catch(() => {console.log("Failed to login.");});
                
                if (username){
                    message.channel.send(`Checking ROBLOX for ${username}`)
                    roblox.getIdFromUsername(username)
                    
                    .then(function(id){
                        roblox.getRankInGroup(groupId, id)
                        .then(function(rank){
                            if(maxrank <= rank){
                                CorsairianBot.channels.get(`474059084753010718`).send(`${id} is rank ${rank} and not promotable.`);
                            } else {
                                CorsairianBot.channels.get(`474059084753010718`).send(`${id} is rank ${rank} and promotable.`);
                                roblox.promote(groupId, id)
                                .then(function(roles){
                                    message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`);
                                }).catch(function(err){
                                    message.channel.send("Failed to promote.");
                                });
                            }
                        }).catch(function(err){
                            CorsairianBot.channels.get(`474059084753010718`).send("Couldn't get player in the group.");
                        });
                    }).catch(function(err){ 
                        CorsairianBot.channels.get(`474059084753010718`).send(`Sorry, but ${username} doesn't exist on ROBLOX.`);
                    });
                } else {
                    CorsairianBot.channels.get(`474059084753010718`).send("Failed to promote.");
                }
            }
            

            if (CurrentRank == 2) {
                Prestige[message.author.id].Role = "Trooper";
                message.guild.members.get(message.author.id).setNickname(`[E2] ${Prestige[message.author.id].ROBLOXUsername}`);
            } else if (CurrentRank == 3) {
                Prestige[message.author.id].Role = "Corporal";
                message.guild.members.get(message.author.id).setNickname(`[E3] ${Prestige[message.author.id].ROBLOXUsername}`);
            } else if (CurrentRank == 4) {
                Prestige[message.author.id].Role = "Sergeant";
                message.guild.members.get(message.author.id).setNickname(`[E4] ${Prestige[message.author.id].ROBLOXUsername}`);
            } else if (CurrentRank == 5) {
                Prestige[message.author.id].Role = "Staff Sergeant";
                message.guild.members.get(message.author.id).setNickname(`[E5] ${Prestige[message.author.id].ROBLOXUsername}`);
            } else if (CurrentRank == 6) {
                Prestige[message.author.id].Role = "Warrant Sergeant";
                message.guild.members.get(message.author.id).setNickname(`[W] ${Prestige[message.author.id].ROBLOXUsername}`);
            }
        } else if (message.content.startsWith(PREFIX + "confirm") && message.channel.name == "verify") {
            let member = message.member;
            member.addRole(role).catch(console.error);
        } else if (message.content.startsWith(PREFIX + "cp")) {
            let Perchantage = CurrentPrestige/NextLevel;
            if (Perchantage >= 1) {
                Perchantage == 1
            }
            Perchantage = Math.floor(Perchantage * 10);
            let Bar = "";
            for (i = 1; i <= 10; i++) {
                if (i <= Perchantage) {
                    Bar = `${Bar}` + `\:white_circle:`;
                } else {
                    Bar = `${Bar}` + `\:black_circle:`;
                }
            }

            message.channel.send({embed: {
                color: 0x008080,
                author: {
                  name: Prestige[message.author.id].ROBLOXUsername,
                  icon_url: message.author.avatarURL
                },
                title: `${Role}`,
                fields: [{
                    name: `**PRESTIGE: ${CurrentPrestige}**`,
                    value: `${NextLevel - CurrentPrestige} Prestige until Next Rank: ${Bar}`
                  },
                  {
                    name: "**WARNINGS**",
                    value: `${Prestige[message.author.id].Warnings}`,
                    inline: true
                  },
                  {
                    name: "**KICKS**",
                    value: `${Prestige[message.author.id].Kicks}`,
                    inline: true
                  },
                  {
                    name: "**BANS**",
                    value: `${Prestige[message.author.id].Bans}`,
                    inline: true
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: CorsairianBot.user.avatarURL,
                  text: "Database II Integrated"
                }
              }
            });
        } 
    }
    fs.writeFile(VerificationJSON, JSON.stringify(Code), (err) => {
        if (err) throw err;
        console.log(err)
    });
    fs.writeFile(PrestigeJSON, JSON.stringify(Prestige), (err) => {
        if (err) throw err;
        console.log(err)
    });
}})
