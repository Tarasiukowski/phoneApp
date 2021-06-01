import { User } from "../../../interfaces"

export type props = {
  messages: Message[]
  width?: string
  user: User | null
}

export type Message = {
  content: string,
  from: string,
  id: string
}