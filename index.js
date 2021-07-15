const {
  Client,
  Collection,
  Intents
} = require("discord.js-light");
const Discord = require('discord.js-light')
const fs = require("fs");

var myIntents = new Intents(Intents.ALL);
myIntents.remove(['GUILD_PRESENCES', 'DIRECT_MESSAGE_TYPING', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_INVITES', 'GUILD_WEBHOOKS', 'GUILD_INTEGRATIONS', 'GUILD_EMOJIS', 'GUILD_BANS']);

var offevents = [
  "messageUpdate",
  "messageDelete",
  "messageDeleteBulk",
  "messageReactionAdd",
  "messageReactionRemove",
  "messageReactionRemoveAll",
  "messageReactionRemoveEmoji",
  "channelCreate",
  "channelUpdate",
  "channelDelete",
  "channelPinsUpdate",
  "roleCreate",
  "roleUpdate",
  "roleDelete",
  "inviteCreate",
  "inviteDelete",
  "emojiCreate",
  "emojiUpdate",
  "emojiDelete",
  "guildEmojisUpdate",
  "guildBanAdd",
  "guildBanRemove",
  "guildUpdate",
  "guildUnavailable",
  "guildMemberAdd",
  "guildMemberUpdate",
  "guildMemberRemove",
  "guildIntegrationsUpdate",
  "presenceUpdate",
  "typingStart",
  "userUpdate",
  "webhookUpdate"
]
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const client =
  new Client({
    intents: myIntents,
    allowedMentions: {
      parse: ['roles'],
      repliedUser: true
    },
    messageCacheMaxSize: 1,
    messageCacheLifetime: 1000,
    messageSweepInterval: 360000,
    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: false,
    cachePresences: false,
    disabledEvents: offevents
  })

client.commands = new Collection();
client.config = require("./config")
client.PREFIX = require(`./config`).prefix
client.prefix = require(`./config`).prefix/
    console.log(client.prefix)      // this and above line are not same ok keep both
client.login(client.config.token);

client.on("warn", (info) => console.log(info));
client.on("error", console.error);
client.on("ready", async () => {
  client.user.setPresence({
     // afk: true,
    activities: [{
      name: ` Leave Humanity return to monke`,
      type: 'WATCHING'
    }]
  });
  console.log(`Client Logged in as: ${client.user.tag} with the ID: ${client.user.id}`);
});

fs.readdirSync("./commands").forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
  };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};
process.on('unhandledRejection', (reason, p) => {
  console.log('===== UNHANDLED REJECTION =====');
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.log('===== UNHANDLED REJECTION =====');
  // application specific logging, throwing an error, or other logic here
});