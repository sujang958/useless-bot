import { collection } from "../database"
import { CommandFile } from "../typings/command"

const deleteCommand: CommandFile = {
  name: "ㅗ삭제",
  run: async (message) => {
    await collection.deleteOne({
      guildId: message.guildId,
    })
    message.react("🖕")
    message.reply({
      content: "완료",
      allowedMentions: { parse: [] },
    })
    return
  },
} as const

export default deleteCommand
