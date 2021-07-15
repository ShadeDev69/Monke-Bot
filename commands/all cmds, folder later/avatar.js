module.exports = {
	name: "avatar",
	cooldown: 5,
	aliases: ["av"],
	category: "image",
	description: "Shows Avatar",
	usage: "[username | nickname | mention | ID](optional)",
	run: async (message, args) => {
	  let user =
		message.mentions.members.first() ||
		message.guild.members.cache.get(args[0]) ||
		message.guild.members.cache.find(
		  (r) =>
			r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
		) ||
		message.guild.members.cache.find(
		  (r) =>
			r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
		) ||
		message.member;
  
	  if (args[0]) {
		message.channel.send({
		  embed: {
			title: `Here is ${user.user.username}'s Avatar`,
  
			color: 0xff0000,
  
			image: {
			  url:
				`${user.user.displayAvatarURL({ dynamic: true })}` + "?size=4096",
			},
  
			timestamp: new Date(),
  
			footer: {
			  text: message.guild.name,
			  icon_url: message.guild.iconURL(),
			},
		  },
		});
	  } else if (!args[0]) {
		message.channel.send({
		  embed: {
			title: `Here is ${user.user.username}'s Avatar`,
  
			color: 0xff0000,
  
			image: {
			  url:
				`${user.user.displayAvatarURL({ dynamic: true })}` + "?size=4096",
			},
  
			timestamp: new Date(),
  
			footer: {
			  text: message.guild.name,
			  icon_url: message.guild.iconURL(),
			},
		  },
		});
	  }
	},
  };