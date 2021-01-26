const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('You Do Not Have Permission To Do That!');
    }


    let giveawayChannel = message.mentions.channels.first();

    if(!giveawayChannel){
        return message.channel.send('You Have To Specify A Message ID!');
    }


    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('You Have To Specify A Time!');
    }


    let giveawayNumberWinners = args[2];

    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('You Have To Specify How Many People Will Win!');
    }


    let giveawayPrize = args.slice(3).join(' ');

    if(!giveawayPrize){
        return message.channel.send('You Have To Specify A Prize!');
    }
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"> Giveaway!",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"**> Giveaway Ended**",
            timeRemaining: "Time Remaining: **{duration}**!",
            inviteToParticipate: "React With 🎉 To Participate!",
            winMessage: "Congratulations, {winners}! You Won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway Cancelled, No Valid Participations.",
            hostedBy: "Hosted By: {user}",
            winners: "Winner(s)",
            endedAt: "Ended At",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

};
