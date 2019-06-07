//Complete with cookies!
const Discord = require('discord.js');
const CorsairianBot = new Discord.Client();

const PREFIX = 's>';
const https = require('https')
const rbx = require('noblox.js')
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGOOB_URI, { useNewUrlParser: true });
const data = require("./models/dataBeta.js")

var mainGroupId = 4376727;
var knighthoodGroupId = 4378284;
var pantheonGroupId = 4465617;
var royaltyGroupId = 4378280;

var requiredMainRep = [
    Peasant = ["Peasant", 0, 1],
    Page = ["Page", 10, 3],
    Sergeant = ["Sergeant", 30, 4],
    Squire = ["Squire", 50, 5],
    Knight = ["Knight", 100, 6],
    Paladin = ["Paladin", 300, 7],
    Marshal = ["Marshal", 700, 8],
    CommanderAtArms = ["Commander At Arms", 1000, 100],
    GrandCommander = ["Grand Commander", 1500, 101]
];

var requiredKnighthoodRep = [
    AwaitingTryouts = ["Awaiting Tryouts", 0, 3],
    Ranger = ["Ranger", 50, 5],
    Marine = ["Marine", 100, 6],
    Commando = ["Commando", 700, 8],
    LordCommander = ["Lord Commander", 1500, 101]
];

var requiredPantheonRep = [
    AwaitingTryouts = ["Awaiting Tryouts", 0, 3],
    Worshiper = ["Worshiper", 50, 5],
    Priest = ["Priest", 100, 6],
    Chaplain = ["Chaplain", 700, 8],
    GrandCommander = ["Grand Commander", 1500, 101]
];

var requiredRoyaltyRep = [
    Peasant = ["Peasant", 0, 1],
    MenAtArms = ["Men At Arms", 10, 3],
    Marquis = ["Marquis", 2000, 200],
    Viceroy = ["Viceroy", 2500, 201],
    
];

var username = 'ImperialOrganizer';

function setGroupRank(groupId, id, role) {
    rbx.setRank(groupId, id, role) 
    .then(function (newRank) {
        console.log(newRank);
    });
}

function checkReputation(id, rep) {
    rbx.getRankInGroup(mainGroupId, id)
    .then(function (currentRole) {
        console.log("Current role: " + currentRole);
        if (currentRole != 0) {
            console.log("Length of array: " + requiredMainRep.length);
            for (i = 0; i<requiredMainRep.length; i++) { //Iterates through the array to see if the player's reputation is high enough.
                console.log("Array spot: " + requiredMainRep[i]);
                console.log("Array spot children 1: " + requiredMainRep[i][1]);
                if (typeof requiredMainRep[i+1] == `undefined`) {
                    if (requiredMainRep[i][1] <= rep) {
                        var role = requiredMainRep[i][2];
                        console.log(role);
                        setGroupRank(mainGroupId, id, role);
                        break;
                    }
                } else {
                    if (requiredMainRep[i][1] <= rep && rep < requiredMainRep[i+1][1] ) {
                        var role = requiredMainRep[i][2];
                        setGroupRank(mainGroupId, id, role);
                        break;
                    }
                }
            } 
        }
        
       
    });
    rbx.getRankInGroup(knighthoodGroupId, id)
    .then(function (currentRole) {
        console.log(currentRole);
        if (currentRole != 0) {
            for (i = 0; i<requiredKnighthoodRep.length; i++) { //Iterates through the array to see if the player's reputation is high enough.
                if (typeof requiredKnighthoodRep[i+1] == `undefined`) {
                    if (requiredKnighthoodRep[i][1] <= rep) {
                        var role = requiredKnighthoodRep[i][2];
                        console.log(role);
                        setGroupRank(knighthoodGroupId, id, role);
                        break;
                    }
                } else {
                    if (requiredKnighthoodRep[i][1] <= rep && rep < requiredKnighthoodRep[i+1][1] ) {
                        var role = requiredKnighthoodRep[i][2];
                        setGroupRank(knighthoodGroupId, id, role);
                        break;
                    }
                }
            } 
        }
       
    });   
    rbx.getRankInGroup(pantheonGroupId, id)
    .then(function (currentRole) {
        console.log(currentRole);
        if (currentRole != 0) {
            for (i = 0; i<requiredPantheonRep.length; i++) { //Iterates through the array to see if the player's reputation is high enough.
                if (typeof requiredPantheonRep[i+1] == `undefined`) {
                    if (requiredPantheonRep[i][1] <= rep) {
                        var role = requiredPantheonRep[i][2];
                        console.log(role);
                        setGroupRank(pantheonGroupId, id, role);
                        break;
                    }
                } else {
                    if (requiredPantheonRep[i][1] <= rep && rep < requiredPantheonRep[i+1][1] ) {
                        var role = requiredPantheonRep[i][2];
                        setGroupRank(pantheonGroupId, id, role);
                        break;
                    }
                }
            } 
        }
        
    });   
}

async function startApp () {
    await rbx.cookieLogin(process.env.ROBLOXPASS);
    let currentUser = await rbx.getCurrentUser()
}
startApp()
.then(function() {
    console.log('Logged in.') 
})
.catch(function(error) { 
    console.log(`Login error: ${error}`) 
});

function getUsers(list) {
    var userList = list;
    console.log(userList);

    userList = userList.split("|");
    
    for (i=0; i<userList.length; i++) {
        var userName = userList[i].split("^");

        if (!userName[0] == "") {
            getId(userName[0], userName[1], function(result, name, rep) {
                searchAccount(result, name, rep);
            });

            function searchAccount(result, name, rep) {

                data.findOne({userId: result}, (err, account) => { // Looks for the user in the database, if not found creates an account. 
                    console.log(result);
                    if (err) console.log(err);
                    if (!account) {
                        createDocument(result, name, rep);
                    } else {
                        var newRep = parseInt(account.reputationPoints) + parseInt(rep);

                        checkReputation(result, newRep);

                        account.reputationPoints = newRep;
                        account.save().catch(err => console.log(err));
                    }
                })
            }
        }
    }
}

function getId(username, rep, callback) { //Function that finds
    https.get("https://api.roblox.com/users/get-by-username?username="+username, (res) => { 
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            callback(JSON.parse(data).Id, username, rep);
        });
        
    }).on('error', (err) => {
       console.log("Error: "+ err.message); 
    });
    
}

function createDocument(idParam, usernameParam, repParam) {
    if (!repParam || repParam == null || repParam == "undefined") {
        repParam = "0";
    }
    const newData = new data({ //Creates new entry
        _id: mongoose.Types.ObjectId(),
        username: usernameParam,
        userId: idParam,
        reputationPoints: repParam,
    });
    
    newData.save(); //Saves and then prints the result of the new object.
    checkReputation(idParam, repParam);

}

CorsairianBot.login(process.env.BOT_TOKEN);

CorsairianBot.on('message', (message) => {{
    var BotUsername = "Imperial Organizer";
    
    //Ready for action!
    
    var guild = CorsairianBot.guilds.get(`459442373517115392`);
    var allowedRole = guild.roles.find("name", "L | ENFORCER TEKK");
    var role = guild.roles.find("name", "Subject of the Empire");

    if (message.channel.name == "reputation-log" && message.author.username != BotUsername) {
        getUsers(message.content);
    } else if (message.content.startsWith(PREFIX + "search")) {
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
    } else if (message.content.startsWith(PREFIX + "rep")) {
        var args = message.content.split(" ");
        var player = args[1];

        getId(player, 0, function(result, name, rep) {
            data.findOne({userId: result}, (err, account) => {
                if (err) console.log("Error at retrieving data: \n" + err) 
                else if (!account) {
                    createDocument(result, name, rep);
                } else {
                    message.channel.send({embed: {
                        color: 0x008080,
                        author: {
                            name: player,
                            icon_url: message.author.avatarURL
                        },
                        title: 'Group-Wide Reputation',
                        fields: [{
                            name: `**REPUTATION: ${account.reputationPoints}**`,
                            value: "──────────────────────",
                        },
                        ],
                        timestamp: new Date(),
                        footer: {
                        icon_url: CorsairianBot.user.avatarURL,
                        text: "Office of Imperial Registry"
                        }
                    }
                    });
                }
            })
        });
        
    }
    
}})
