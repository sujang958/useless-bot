import { collection } from "../database"
import { CommandFile } from "../typings/command"

const setCommand: CommandFile = {
  name: "ㅗ설정",
  run: async (message) => {
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
  },
} as const

export default setCommand
