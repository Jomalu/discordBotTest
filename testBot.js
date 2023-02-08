const Discord = require("discord.js");
const stayAwake = require("./service");

const client = new Discord.Client();
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "!post") {
    const exampleMessage = await message.channel.send(
      "React to this message to get a role!"
    );
    await exampleMessage.react("✅");

    const filter = (reaction, user) =>
      reaction.emoji.name === "✅" && user.id !== client.user.id;
    const collector = exampleMessage.createReactionCollector(filter);

    collector.on("collect", async (reaction) => {
      const user = reaction.users.cache.last();
      const role = message.guild.roles.cache.find(
        (role) => role.name === "Example Role"
      );
      const member = message.guild.members.cache.get(user.id);
      console.log("member has role: ", member).roles.cache.has(role.id);

      if (member.roles.cache.has(role.id)) return;

      console.log("got to adding the role");
      await member.roles.add(role);
      await user.send(`You have been given the "${role.name}" role.`);
    });
  }
});

stayAwake();
client.login(process.env.KEY);
