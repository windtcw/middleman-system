const Discord = require("discord.js");
const client = new Discord.Client();

process.on('unhandledRejection', err => console.error(err));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    var args = message.content.split(" ").slice(1);
    var argresults = args.join(" ");
    if (message.channel.name === 'middleman-calls' && !message.content.startsWith(".call")) return message.delete();
    if (message.content.startsWith(".call")) {
        var partner = message.mentions.members.first();
        var claims = client.channels.find("name", "middleman-calls");
        const callId = Math.floor(Math.random() * 1000);
        if (!partner) return message.author.send("You have to mention who you are trading with!")
        await message.guild.createRole({
            name: `call-${callId}`
        }).then(role => console.log(`Created role ${role}`)).catch(console.error)
        await message.member.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
        await partner.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
        await client.user.addRole(message.guild.roles.find("name", `call-${callId}`)).catch(console.error)
        await message.guild.createChannel(`call-${callId}`, 'text').catch(console.error)
        await client.channels.find("name", `call-${callId}`).overwritePermissions(message.guild.id, {
            READ_MESSAGES: false
        }).catch(console.error)
        await client.channels.find("name", `call-${callId}`).overwritePermissions(message.guild.roles.find("name", `call-${callId}`), {
            SEND_MESSAGES: true
        }).catch(console.error)
        await client.channels.find("name", `call-${callID}`)
        const msg = await message.channel.send('xd');
        await msg.react('✅');
        await msg.react('❌');
        const collector = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❌' && (user.id === user1.id || user.id === user2.id), {
            time: 60e3 errors: ['time'],
            maxUsers: 2
        });
        collector.on('collect', r => {
            // Do something if you receive a reaction, something like:
            if (reaction.emoji.name === '❌') {
                // Do something
            };
            // Would work
        });
        collector.on('end', collected => {
            if (collected.size < 2) {
                // Do something if both users didn't react
            }
        });
    } else

    if (message.content.startsWith(".claim")) {
        if (message.channel.name === 'middleman-claims') return message.reply("this command can only be used in middleman claims")
        let callIDChannel = client.channels.find("name", `call-${argresults}`)
        if (!callIDChannel) return message.channel.send("I couldn't find a call with this ID")
        await client.channels.find("name", `call-${argresults}`).send("MIDDLEMAN HERE MSG")
        await message.member.addRole(message.guild.roles.find("name", `call-${argresults}`)).catch(console.error)
    } else

    if (message.content.startsWith(".finish")) {
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

client.login("Snip");
