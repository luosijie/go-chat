import { Message } from '@/types'
import { create } from 'zustand'

type MessageStore = {
    active: Message | null
    messages: Array<Message>
    setActive: (message: Message) => void
    setMessages: (messages: Array<Message>) => void
}

export const useMessageStore = create<MessageStore>((set) => ({
    active: null,
    messages: [],
    setMessages: (messages: Array<Message>) => {
        set(() => ({ messages }))
    },
    setActive: (message: Message) => {
        set(() => ({ active: message }))
    }
}))