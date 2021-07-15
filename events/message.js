const Discord = require('discord.js-light')
const cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ehook = new Discord.WebhookClient("815088212916568077", "-w1Nd9ikaBwm0JDVsT-M8Nd-A2jN3iMpJGGLIiB1ijEnetDacZ5GzpZ2OIClV03fvp6v");
module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;

    
      const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(message.client.PREFIX.toLowerCase())}|${escapeRegex(message.client.PREFIX.toUpperCase())})\\s*`);
  if (!prefixRegex.test(message.content)) return;

    if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) return;
    else if (!message.channel.permissionsFor(message.client.user).has('EMBED_LINKS')) return;
    
  var [matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = message.client.commands.get(commandName) ||
    message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));


  if (!command && message.mentions.users && message.mentions.users.has(message.client.user.id)) {
return message.channel.send(`My prefix is ${message.client.prefix}`)
};

if (!command) return;
if (!cooldowns.has(command.name)) {
cooldowns.set(command.name, new Discord.Collection());
}
const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 2) * 1000;
if (timestamps.has(message.author.id)) {
const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
if (now < expirationTime) return;
}
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
if (args[0] && (args[0].toLowerCase() == "-h" || args[0].toLowerCase() == "-help")) {
return message.channel.send(e)
};
try {
await command.run(message, args);
} catch (error) {
console.error(error);
message.channel.send("There was an error executing that command. This error has been logged. Please avoid spamming until its fixed.").catch(console.error);

}
}