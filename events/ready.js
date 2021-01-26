module.exports = (client) => {
    console.log(
      `Ready To Help In ${client.channels.cache.size} Channels On ${client.guilds.cache.size} Servers For A Total Of ${client.users.cache.size} Members!`
    );
  
    const activities = [`Giveaways In ${client.guilds.cache.size} Servers`,"Prizes, Prizes, Prizes!",`Over ${client.users.cache.size} Users!`];
    setInterval(() => {
      let activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity("Source By Ren!", { type: "WATCHING" });
    }, 20000);
  
  };
