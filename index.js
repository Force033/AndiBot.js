const aoi = require("aoi.js")
const fs = require("fs")

const bot = new aoi.Bot({
token: "ODQ4NTY4NzI1ODAzNzYxNjg1.YLOhNQ.98_isV8yH2RDu3Jx6ePT2IzTNAc",
prefix: "$getServerVar[prefix]"
})
const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.sendStatus(200);
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

bot.status({
  text: "TESTING",
  type: "PLAYING",
  time: 12
})
 
bot.onMessage()

//welcome 
const username = `$username[$authorID]`
const discrim = `$discriminator[$authorID]`
const members = `$membersCount`
const guild = `$serverName`
const avatar = `$replaceText[$userAvatar[$authorID];webp;png]`
const background = `https://files.123freevectors.com/wp-content/original/151915-abstract-orange-diagonal-lines-and-stripes-background.jpg`

bot.joinCommand({
channel: "$replaceText[$replaceText[$checkCondition[$getServerVar[joinchannel]==];true;$randomChannelID];false;$getServerVar[joinchannel]]",
code: `$djseval[(async() =>{const Discord = require('discord.js')
const canvas = require('discord-canvas'),
  welcomeCanvas = new canvas.Welcome();
let image = await welcomeCanvas
  .setUsername("${username}")
  .setDiscriminator("${discrim}")
  .setMemberCount("${members}")
  .setGuildName("${guild}")
  .setAvatar("${avatar}")
  .setColor("border", "#ff0000")
  .setColor("username-box", "#660000")
  .setColor("discriminator-box", "#ff0000")
  .setColor("message-box", "#ff6666")
  .setColor("title", "#ff0000")
  .setColor("avatar", "#660000")
  .setBackground("${background}")
  .toAttachment();
let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome.png");
message.channel.send(attachment);
})()]
$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[joinmessage];(user.mention);<@$authorID>];(guild.name);$serverName];(user.username);$username[$authorID]];(tag);#$discriminator];(members);$membersCount[$guildID;all;no]]
$onlyIf[$getServerVar[joinchannel]!=;]
$onlyIf[$getServerVar[joinchannel]==$channelID;]
$suppressErrors[**⛔ Error**{delete:1s}]`
})
 
bot.onJoined();
 
 
bot.leaveCommand({
channel: "$replaceText[$replaceText[$checkCondition[$getServerVar[leavechannel]==];true;$randomChannelID];false;$getServerVar[leavechannel]]",
code: `$djseval[(async() =>{const Discord = require('discord.js')
const canvas = require('discord-canvas'),
  goodbyeCanvas = new canvas.Goodbye();
let image = await goodbyeCanvas
  .setUsername("${username}")
  .setDiscriminator("${discrim}")
  .setMemberCount("${members}")
  .setGuildName("${guild}")
  .setAvatar("${avatar}")
  .setColor("border", "#ff5c33")
  .setColor("username-box", "#ff0000")
  .setColor("discriminator-box", "#ff0000")
  .setColor("message-box", "#ff0000")
  .setColor("title", "#ff0000")
  .setColor("avatar", "#ff5c33")
  .setBackground("${background}")
  .toAttachment();
let attachment = new Discord.MessageAttachment(image.toBuffer(), "goodbye.png");
message.channel.send(attachment);
})()]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[leavemessage];(user.username);$username[$authorID]];(guild.name);$serverName];(tag);#$discriminator];(members);$membersCount[$guildID;all;no]]
$onlyIf[$getServerVar[leavechannel]!=;]
$onlyIf[$getServerVar[leavechannel]==$channelID;]
$suppressErrors[**⛔ Error**{delete:1s}]`
})
 
bot.onLeave();
 
 
bot.command({
 name: "setjoinchannel",
 code: `
$setServerVar[joinchannel;$mentionedChannels[1]]
Set Server Joinchannel To <#$mentionedChannels[1]>
$onlyIf[$mentionedChannels[1]!=;Mention a channel]
$onlyPerms[manageserver;You need manage server permission]`
 })
 
bot.command({
 name: "setleavechannel",
 code: `
$setServerVar[leavechannel;$mentionedChannels[1]]
Successfully Set Server Leave Channel To <#$mentionedChannels[1]>
$onlyIf[$mentionedChannels[1]!=;Mention a channel]
$onlyPerms[manageserver;You need manage server permission!]`
 })
 
bot.command({
 name: "setleavemessage",
 code: `
$setServerVar[leavemessage;$message]
Set Server Leave Message To $message
$onlyIf[$getServerVar[leavechannel]!=;This Server Has No Join Leave! Set it by $getServerVar[prefix]setleavemessage
(channel)]
$argsCheck[>1;Write something]
$onlyPerms[manageserver;You need manage server permission]`
 })
 
bot.command({
 name: "setjoinmessage",
 code: `
$setServerVar[joinmessage;$message]
Set Server Join Message To $message
$onlyIf[$getServerVar[joinchannel]!=;Server Join Message To $message
$onlyIf[$getServerVar[joinchannel]!=;This Server Has No Join Channel! Set it by $getServerVar[prefix]setjoinchannel (channel)]Server Has No Join Channel! Set it by $getServerVar[prefix]setjoinchannel (channel)]
$argsCheck[>1;Write something]
$onlyPerms[manageserver;You need manage server permission]`
 })



 // Variable
bot.variables({
 prefix: "b!",
 warn: "0",
 joinchannel: "",
 leavechannel: "",
 joinmessage: "",
 leavemessage: ""

})

 //commands handler
var reader = fs.readdirSync("./commands/").filter (file => file.endsWith(".js"))
for(const file of reader) {
  const command = require(`./commands/${file}`)
  bot.command({
name: command.name, 
code: command.code
  })
}


