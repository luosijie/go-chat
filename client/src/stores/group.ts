import { Group, GroupType, Message, SingleGroup, UserSummary } from '@/types'
import { groupStorage } from '@/utils/storage'
import { produce } from 'immer'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { useUserStore } from './user'

type GroupStore = {
    active: Group | null
    list: Array<Group>
    addGroup: (user: Group) => Group
    createCroupFromMessage: (msg:Message) => number
    findGroup: (id: string) => Group | undefined
    findGroupIndex: (id: string) => number
    setActive: (contact: Group) => void
    addMessage: (msg: Message) => void
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    active: groupStorage.fist(),
    list: groupStorage.getList(),
    
    addGroup: (group: Group) => {
        console.log('add-group:', group)
        const list = get().list
        let exist = list.find(e => e.id === group.id)

        if (!exist) {
            set(() => ({ list: [group, ...get().list]}))  

            exist = group
        }

        groupStorage.setList(get().list)

        return exist
    },

    createCroupFromMessage: (msg: Message) => {

        if (msg.groupType === GroupType.Single) {
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
            
            const ids = msg.groupId.split('-')
            const toId = ids.find(e => String(e) !== String(owner?.id))
            const toUser = users.find(e => String(e.id) === String(toId))


            if (!owner) return -1
            if (!toUser) return -1

            const group:SingleGroup = {
                type: GroupType.Single,
                id: msg.groupId,
                from: owner,
                to: toUser,
                history: []
            }

            set(produce((state: GroupStore) => {
                state.list.unshift(group)
            }))

            return 0
            
        }


        

        return -1
    },

    addMessage: (msg: Message) => {
        let groupIdex = get().findGroupIndex(msg.groupId) 
        
        if (groupIdex === -1) {
            groupIdex = get().createCroupFromMessage(msg)
        }


        if (groupIdex === -1) {
            return
        }

        set(produce((state:GroupStore) => {
            const history = state.list[groupIdex].history
            history.push(msg)
            if (history.length > 100) history.shift()
        }))

        const group = get().list[groupIdex]

        const active = get().active
        if (active !== null && active.id === group.id) {
            
            get().setActive(group)
        }

        // get().setActive(group)

        groupStorage.setList(get().list)
    },

    findGroup: (id: string) =>  {
        return get().list.find(e => e.id === id)
    },

    findGroupIndex: (id: string) => {
        return get().list.findIndex(e => e.id === id)
    },

    setActive: (group: Group) => {
        set(() => ({ active: group }))
    }

}))