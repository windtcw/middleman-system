const Discord = require("discord.js");
const client = new Discord.Client();

process.on('unhandledRejection', err => console.error(err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let prefix = "!"
client.on('message', async (message) => {



    if (message.content.startsWith(prefix + "call")) {
        var args = message.content.split(" ").slice(2);
        var argresults = args.join(" ");
        var partner = message.mentions.members.first();
        var claims = client.channels.find("name", "middleman-calls");
        const callId = Math.floor(Math.random() * 10000);
        if (!partner) return message.author.send("You have to mention who you are trading with!")
        message.delete()
        await message.guild.createRole({
            name: `call-${callId}`
        }).then(role => console.log(`Created role ${role}`)).catch(console.error)
        await message.member.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
        await partner.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
      //  await client.user.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
        await message.guild.createChannel(`call-${callId}`, 'text').catch(console.error)
        await client.channels.find("name", `call-${callId}`).overwritePermissions(message.guild.id, {
            READ_MESSAGES: false
        }).catch(console.error)
        await client.channels.find("name", `call-${callId}`).overwritePermissions(message.guild.roles.find("name", `call-${callId}`), {
            READ_MESSAGES: true
        }).catch(console.error)
        client.channels.find("name", `call-${callId}`).send(new Discord.RichEmbed().setTimestamp().setDescription("**Make sure to read the rules below:\n1) Everything about the trade with the Middleman will take place in this channel. You will not receive direct messages on steam or other communitcation.\n2) Treat the Middleman with respect\n3) When the middleman claims the call, the bot will verify him in this channel.\nAfter that, you have to add him on one of his gaming profiles (PC, PSN, XBOX).\n\nAfter reading this and accepting the rules, please type !yes.\nAter both typing `!yes`, you will be placed in the Middleman queue.\nIf someone does not confirm, type `!cancel` to cancel the trade.**").setColor(0xff0000))
          const filter = m => [message.author.id, user.id].includes(m.author.id) && ['!yes', '!no'].includes(m.content.toLowerCase());
        		const collector = client.channels.find("name", `call-${callId}`).createMessageCollector(filter, { time: 60e3 });
        		const temp = [];
        		collector.on('collect', msg => {
        			if (!temp.includes(msg.author.id) && msg.content === 'no') return collector.stop();
        			temp.push(msg.author.id);
        			if (temp.length === 2) return collector.stop();
        			return temp;
        		});
        		collector.on('end', collected => {
        			if (collected.every(m => m.content === 'yes') && temp.length === 2) {
        				message.guild.channels.find('name', 'middleman-claims').send(`Traders - ${message.author} | ${user}\n**Call ID ${id}**\nDo \`!claim ${id}\` to claim the call!`);
        				calls.set(id, { user: message.author.id, target: user.id, call: id, channel: channel.id });
        				return queue.delete(message.author.id);
        			}
        			else {
        				queue.delete(message.author.id);
        				return channel.delete().then(() => message.guild.channels.find('name', 'middleman-claims').send('Aborted the call, the channel will be deleted.'));
        			}
        		});
        		return null;
        	},

    } else

    if (message.content.startsWith(prefix + "ca")) {
      message.channel.fetchMessages({ limit: 99 });
      message.channel.bulkDelete(99, true);
    } else

    // Complete
    if (message.content.startsWith(prefix + "claim")) {
        var args = message.content.split(" ").slice(1);
        var argresults = args.join(" ");
        if (!argresults) return message.channel.send(new Discord.RichEmbed().setTimestamp().setDescription(message.author + ", You must mention a valid call ID").setColor(0xff0000))
        if (message.channel.name !== 'middleman-claims') return message.reply("this command can only be used in middleman claims")
        let callIDChannel = client.channels.find("name", `call-${argresults}`)
        if (!callIDChannel) return message.channel.send(new Discord.RichEmbed().setTimestamp().setDescription("I couldn't find a call with this ID"))
        message.channel.send(new Discord.RichEmbed().setColor(0xff0000).setTimestamp().setDescription(message.author + " claimed call ID: " + argresults).setColor(0xff0000))
        await client.channels.find("name", `call-${argresults}`).send(new Discord.RichEmbed().setTimestamp().setDescription("The middleman, " + message.author + " has claimed your call.. Make sure to add them using appropriate links!").setColor(0xff0000))
        await client.channels.find("name", `call-${argresults}`).send("!rep " + message.author).then(m => m.delete())
        await client.channels.find("name", `call-${argresults}`).send("!verify " + message.author).then(m => m.delete())
        await message.member.addRole(message.guild.roles.find("name", `call-${argresults}`)).catch(console.error)
    } else
    // Complete
    if (message.content.startsWith(prefix + "atc")) {
      var args = message.content.split(" ").slice(2);
      var argresults = args.join(" ");
      var victim = message.mentions.members.first();
      let callIDChannel = client.channels.find("name", `call-${argresults}`)
      let callIDRole = message.guild.roles.find("name", `call-${argresults}`)
      if (!partner) return message.channel.send(new Discord.RichEmbed().setColor(0xff0000).setTimestamp().setDescription("You must specify who you want to add to the call"))
      if (!args) return message.channel.send(new Discord.RichEmbed().setColor(0xff0000).setTimestamp().setDescription("You must specify a valid call ID"))
      if (!callIDChannel) message.author.send(new Discord.RichEmbed().setColor(0xff0000).setTimestamp().setDescription("I couldn't find a call with this ID"))
      if (!callIDRole) message.author.send(new Discord.RichEmbed().setColor(0xff0000).setTimestamp().setDescription("Something went wrong.. I could not find a role with this ID."))
      victim.addRole(callIDRole)

    }
    // Complete
    if (message.content.startsWith(prefix + "finish")) {
      var args = message.content.split(" ").slice(1);
      var argresults = args.join(" ");
      if (message.channel !== `call-${argresults}`) return message.reply(new Discord.RichEmbed().setTimestamp().setDescription("This command can only be used in a call channel"))
      message.channel.send("Thank you for using our middleman service...\nThis chat will close in fifteen seconds!")
      setTimeout(function() {
          let callIDChannel = client.channels.find("name", `call-${argresults}`)
          let callIDRole = message.guild.roles.find("name", `call-${argresults}`)
          if (!callIDChannel) message.author.send("Failed")
          callIDChannel.delete()
          callIDRole.delete()
          message.guild.roles.find("name", `call-${argresults}`).delete()
      }, 15e3);
    } else

    setTimeout(function() {
      if (message.channel.name === 'middleman-calls') return message.delete();
    }, 1500);
});

client.login("Snip"); // Created by Delevingne      
