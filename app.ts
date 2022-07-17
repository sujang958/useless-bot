import "dotenv/config"

import { Client, Intents } from "discord.js"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", (clt) => {
  console.log("Logined:", clt.user.username)
})

// dSjofajoafeojefsialsfgff

client.on("messageCreate", (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  if (message.channelId !== "997829841275600986") return

  message.react("🖕")
  message.reply({
    content: "ㅗ",
    allowedMentions: { parse: [] },
  })
})

client.login(process.env.BOT_TOKEN)
