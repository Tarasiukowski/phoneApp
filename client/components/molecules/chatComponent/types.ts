export type props = {
  messages: Message[]
  width?: string
}

export type Message = {
  content: string,
  from: string,
  id: string
}