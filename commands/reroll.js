const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('You Do Not Have Permission To Do That!');
    }

    if(!args[0]){
        return message.channel.send('You Have To Specify A Message ID!');
    }

    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Unable To Find A Giveaway For: `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway Rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway With: ${giveaway.messageID} Message ID Has Not Ended.`)){
            message.channel.send('This Giveaway Has Not Ended!');
        } else {
            console.error(e);
            message.channel.send('An Error Occurred!');
        }
    });

};
