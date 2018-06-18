var roblox = require('roblox-js');
var discord = require('discord.js');
var client = new discord.Client();
var token = "NDM5NDk2NjI2NzA5NzI1MjE1.DcUKYQ.S5sZrdgxshSIx_nMtJbUApDSEp8"
client.login(token)

client.on("ready", () => {
  client.user.setGame(`Moderating New Jersey!`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

client.on('message', (message) => {
	console.log(`${message.author} said ${message.content}`)
});

var prefix = '!';

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Dick', message)){
    	message.reply('Balls!');
    }
});

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
    	var username = args[1];
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

roblox.login({username: "NJ_BOT", password: "NJBOT123"}).then((success) => {

}).catch(() => {console.log("Failed to login.");});

var prefix = '!';
var groupId = 3738931;
var maximumRank = 253;

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
    	var username = args[1]
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
					} else {
						message.channel.send(`${id} is rank ${rank} and promotable.`)
						roblox.promote(groupId, id)
						.then(function(roles){
							message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
						}).catch(function(err){
							message.channel.send("Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});
