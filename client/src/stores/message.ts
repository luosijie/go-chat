import { Chat, ChatType, GroupChat, Message, SingleChat, UserSummary } from '@/types'
import { chatStorage } from '@/utils/storage'
import { produce } from 'immer'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { Group, useGroupStore } from './group'
import { useUserStore } from './user'

type MessageStore = {
    active: Chat | null
    list: Array<Chat>
    addChat: (user: Chat) => Chat
    createChatFromMessage: (msg:Message) => Promise<number>
    findChat: (id: string) => Chat | undefined
    findChatIndex: (id: string) => number
    setActive: (contact: Chat) => void
    addMessage: (msg: Message) => Promise<void>
}

export const useMessageStore = create<MessageStore>((set, get) => ({
    active: chatStorage.fist(),
    list: chatStorage.getList(),
    
    addChat: (chat: Chat) => {
        const list = get().list
        let exist = list.find(e => e.id === chat.id)

        if (!exist) {
            set(() => ({ list: [chat, ...get().list]}))  

            exist = chat
        }

        chatStorage.setList(get().list)

        return exist
    },

    createChatFromMessage: async (msg: Message) => {

        if (msg.chatType === ChatType.Single) {
            await useFriendStore.getState().getList()
            let owner: UserSummary | undefined
            const user = useUserStore.getState().user
            const users = useFriendStore.getState().list.slice()

            if (user) {
                const loginedUser:UserSummary = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                }
                users.push(loginedUser)

            }

            owner = users.find(e => e.id === msg.from.id)
            
            const ids = msg.chatId.split('-')
            const toId = ids.find(e => String(e) !== String(owner?.id))
            const toUser = users.find(e => String(e.id) === String(toId))


            if (!owner) return -1
            if (!toUser) return -1

            const chat:SingleChat = {
                type: ChatType.Single,
                id: msg.chatId,
                from: owner,
                to: toUser,
                history: []
            }

            set(produce((state: MessageStore) => {
                state.list.unshift(chat)
            }))

            return 0
        }

        if (msg.chatType === ChatType.Group) {
            const groups = await useGroupStore.getState().getList()
            const find = groups.find((g:Group) => String(g.id) === msg.chatId)

            if (find === undefined) return -1

            const chat:GroupChat = {
                type: ChatType.Group,
                id: String(find.id),
                group: find,
                history: []
            }

            set(produce((state: MessageStore) => {
                state.list.unshift(chat)
            }))

            return 0
        }
        

        return -1
    },

    addMessage: async (msg: Message) => {
        let chatIdex = get().findChatIndex(msg.chatId) 
        
        if (chatIdex === -1) {
            chatIdex = await get().createChatFromMessage(msg)
        }

        if (chatIdex === -1) {
            return
        }

        set(produce((state:MessageStore) => {
            const history = state.list[chatIdex].history
            history.push(msg)
            if (history.length > 100) history.shift()
        }))

        const chat = get().list[chatIdex]

        const active = get().active
        if (active !== null && active.id === chat.id) {
            
            get().setActive(chat)
        }

        // get().setActive(chat)

        chatStorage.setList(get().list)
    },

    findChat: (id: string) =>  {
        return get().list.find(e => e.id === id)
    },

    findChatIndex: (id: string) => {
        return get().list.findIndex(e => e.id === id)
    },

    setActive: (chat: Chat) => {
        set(() => ({ active: chat }))

        const list = get().list.slice()
        if (list.length) {
            const index = get().findChatIndex(chat.id)

            const find = list.splice(index, 1)
            get().addChat(find[0])

        }

    }

}))