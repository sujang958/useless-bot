import "dotenv/config"

import { Client, Intents } from "discord.js"
import { MongoClient } from "mongodb"

const DBClient = new MongoClient(
  `mongodb://sujang:${process.env.DB_PW}@cluster0-shard-00-00.qcdis.mongodb.net:27017,cluster0-shard-00-01.qcdis.mongodb.net:27017,cluster0-shard-00-02.qcdis.mongodb.net:27017/?ssl=true&replicaSet=atlas-9jt0g9-shard-0&authSource=admin&retryWrites=true&w=majority`
)

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", (clt) => {
  console.log("Logined:", clt.user.username)
})

client.on("messageCreate", async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  const collection = DBClient.db("usl").collection("usls")

  if (message.content.startsWith("!ㅗ설정 ")) {
    const setId = message.content
      .split("!ㅗ설정 ")[1]
      .replace("<#", "")
      .replace(">", "")

    await collection.updateOne(
      {
        guildId: message.guildId,
      },
      {
        $set: {
          guildId: message.guildId,
          channelId: setId,
        },
      },
      { upsert: true }
    )
    message.react("🖕")
    message.reply({
      content: "완료",
      allowedMentions: { parse: [] },
    })
    return
  }

  const list = await collection.find().toArray()

  if (
    !list.find(
      (item) =>
        item.guildId === message.guildId && item.channelId === message.channelId
    )
  )
    return

  message.react("🖕")
  message.reply({
    content: "ㅗ",
    allowedMentions: { parse: [] },
  })
})

DBClient.connect()
  .then(() => client.login(process.env.BOT_TOKEN))
  .then(() =>
    console.log(
      new Date().toISOString(),
      "Datebase connected, starting the bot"
    )
  )
