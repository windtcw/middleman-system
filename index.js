const Discord = require("discord.js");
const client = new Discord.Client();

process.on('unhandledRejection', err => console.error(err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

let prefix = "."
client.on('message', async (message) => {

    if (message.channel.name === 'middleman-calls') return message.delete();

    if (message.content.startsWith(prefix + "call")) {
      var args = message.content.split(" ").slice(2);
      var argresults = args.join(" ");
        var partner = message.mentions.members.first();
        var claims = client.channels.find("name", "middleman-calls");
        const callId = Math.floor(Math.random() * 1000);
        if (!partner) return message.author.send("You have to mention who you are trading with!")
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
        client.channels.find("name", `call-${callId}`).send("**Make sure to read the rules below:\n1) Everything about the trade with the Middleman will take place in this channel. You will not receive direct messages on steam or other communitcation.\n2) Treat the Middleman with respect\n3) When the middleman claims the call, the bot will verify him in this channel.\nAfter that, you have to add him on one of his gaming profiles (PC, PSN, XBOX).\n\nAfter reading this and accepting the rules, please type !yes.\nAter both typing `!yes`, you will be placed in the Middleman queue.\nIf someone does not confirm, type `!cancel` to cancel the trade.**")
        // Await !vote messages
        client.channels.find("name", `call-${callId}`).awaitMessages(msg => msg.author.id === message.author.id, {
            max: 2,
            time: 60e3
        }).then(collected => {
            if (collected.first().content === prefix + "yes") {
               client.channels.find("name", "middleman-claims").send(new Discord.RichEmbed().setTimestamp().setDescription("\nType `!claim` " + callId + " to claim this call.\n" + message.author + " | " + partner).setAuthor(argresults).setThumbnail(partner.avatarURL).setColor(0xff0000))
               client.channels.find("name", `call-${callId}`).send("You have called for a middleman! Please be patient")
            } else if (collected.first().content === prefix + "no ") {
              let callIDChannel = client.channels.find("name", `call-${callId}`)
              let callIDRole = message.guild.roles.find("name", `call-${callId}`)
              if (!callIDChannel) message.author.send("Failed")
              callIDChannel.delete()
              callIDRole.delete()
            }
          })
    } else

    if (message.content.startsWith(prefix + "ca")) {
      message.channel.fetchMessages({ limit: 99 });
      message.channel.bulkDelete(99, true);
    } else

    if (message.content.startsWith(prefix + "claim")) {
      var args = message.content.split(" ").slice(1);
      var argresults = args.join(" ");
        if (message.channel.name === 'middleman-claims') return message.reply("this command can only be used in middleman claims")
        let callIDChannel = client.channels.find("name", `call-${argresults}`)
        if (!callIDChannel) return message.channel.send("I couldn't find a call with this ID")
        await client.channels.find("name", `call-${argresults}`).send("MIDDLEMAN HERE MSG")
        await message.member.addRole(message.guild.roles.find("name", `call-${argresults}`)).catch(console.error)
    } else

    if (message.content.startsWith(prefix + "cancel")) {
      var args = message.content.split(" ").slice(1);
      var argresults = args.join(" ");
      let callIDChannel = client.channels.find("name", `call-${argresults}`)
      if (!callIDChannel) return message.channel.send("That is not your call ID\nCommand Example: .finish 471")
      message.channel.send("We're sorry you had a problem with our service.\nThis chat will close in fifteen seconds!")
      setTimeout(function() {
          let callIDChannel = client.channels.find("name", `call-${argresults}`)
          let callIDRole = message.guild.roles.find("name", `call-${argresults}`)
          if (!callIDChannel) message.author.send("Failed")
          callIDChannel.delete()
          callIDRole.delete()
          message.guild.roles.find("name", `call-${argresults}`).delete()
      }, 15e3);
    } else

    if (message.content.startsWith(prefix + "finish")) {
      var args = message.content.split(" ").slice(1);
      var argresults = args.join(" ");
        let callIDChannel = client.channels.find("name", `call-${argresults}`)
        if (!callIDChannel) return message.channel.send("I couldn't find a call with this ID\nCommand Example: .finish 471")
        message.channel.send("Thanks for using our middleman service! This channel will close in fifteen seconds!")

        setTimeout(function() {
            let callIDChannel = client.channels.find("name", `call-${argresults}`)
            let callIDRole = message.guild.roles.find("name", `call-${argresults}`)
            if (!callIDChannel) message.author.send("Failed")
            callIDChannel.delete()
            callIDRole.delete()
            message.guild.roles.find("name", `call-${argresults}`).delete()
        }, 15e3);
    }
});

client.login("Snip"); // Created by Delevingne      
