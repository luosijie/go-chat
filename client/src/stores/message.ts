import { Chat, ChatType, Message, SingleChat, UserSummary } from '@/types'
import { chatStorage } from '@/utils/storage'
import { produce } from 'immer'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { useUserStore } from './user'

type MessageStore = {
    active: Chat | null
    list: Array<Chat>
    addChat: (user: Chat) => Chat
    createCroupFromMessage: (msg:Message) => number
    findChat: (id: string) => Chat | undefined
    findChatIndex: (id: string) => number
    setActive: (contact: Chat) => void
    addMessage: (msg: Message) => void
}

export const useMessageStore = create<MessageStore>((set, get) => ({
    active: chatStorage.fist(),
    list: chatStorage.getList(),
    
    addChat: (group: Chat) => {
        console.log('add-group:', group)
        const list = get().list
        let exist = list.find(e => e.id === group.id)

        if (!exist) {
            set(() => ({ list: [group, ...get().list]}))  

            exist = group
        }

        chatStorage.setList(get().list)

        return exist
    },

    createCroupFromMessage: (msg: Message) => {

        if (msg.chatType === ChatType.Single) {
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

            const group:SingleChat = {
                type: ChatType.Single,
                id: msg.chatId,
                from: owner,
                to: toUser,
                history: []
            }

            set(produce((state: MessageStore) => {
                state.list.unshift(group)
            }))

            return 0
            
        }


        

        return -1
    },

    addMessage: (msg: Message) => {
        let chatIdex = get().findChatIndex(msg.chatId) 
        
        if (chatIdex === -1) {
            chatIdex = get().createCroupFromMessage(msg)
        }


        if (chatIdex === -1) {
            return
        }

        set(produce((state:MessageStore) => {
            const history = state.list[chatIdex].history
            history.push(msg)
            if (history.length > 100) history.shift()
        }))

        const group = get().list[chatIdex]

        const active = get().active
        if (active !== null && active.id === group.id) {
            
            get().setActive(group)
        }

        // get().setActive(group)

        chatStorage.setList(get().list)
    },

    findChat: (id: string) =>  {
        return get().list.find(e => e.id === id)
    },

    findChatIndex: (id: string) => {
        return get().list.findIndex(e => e.id === id)
    },

    setActive: (group: Chat) => {
        set(() => ({ active: group }))
    }

}))