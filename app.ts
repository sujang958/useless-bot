import "dotenv/config"

import { Client, Intents } from "discord.js"
import { collection, DBClient } from "./database"
import { CommandFile } from "./typings/command"
import { readdirSync } from "fs"
import { join } from "path"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", (clt) => {
  console.log("Logined:", clt.user.username)
})

const commands = new Map<string, CommandFile>()
const commandsDirectory = join(__dirname, "commands/")

for (const file of readdirSync(commandsDirectory)) {
  const commandFile = require(join(commandsDirectory, file)) as CommandFile
  commands.set(commandFile.name, commandFile)
}

console.log("Loaded commands")

client.on("messageCreate", async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  if (message.content.startsWith("!")) {
    const args = message.content.replace("!", "").split(" ")
    const command = args.shift()
    if (!command) return

    const commandFile = commands.get(command)
    if (!commandFile) return

    commandFile.run(message)
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
