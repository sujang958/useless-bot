import { Message } from "discord.js"

export interface CommandFile {
  name: string
  run: (message: Message) => Promise<void | any>
}
