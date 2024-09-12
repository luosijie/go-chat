import { create } from 'zustand'
import { Message } from '../types'

type MessageStore = {
    current: Message | null
    messages: Array<Message>
    setCurrent: (message: Message) => void
    setMessages: (messages: Array<Message>) => void
}

export const useMessageStore = create<MessageStore>((set) => ({
    current: null,
    messages: [],
    setMessages: (messages: Array<Message>) => {
        set(() => ({messages}))
    },
    setCurrent: (message: Message) => {
        set(() => ({current: message}))
    }
}))