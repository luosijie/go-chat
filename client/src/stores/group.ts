import { Group, GroupType, Message, SingleGroup, UserSummary } from '@/types'
import { groupStorage } from '@/utils/storage'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { useUserStore } from './user'

type GroupStore = {
    active: Group | null
    list: Array<Group>
    addGroup: (user: Group) => Group
    createCroupFromMessage: (msg:Message) => Group|null
    findGroup: (id: string) => Group | undefined
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


            if (!owner) return null
            if (!toUser) return null

            const group:SingleGroup = {
                type: GroupType.Single,
                id: msg.groupId,
                from: owner,
                to: toUser,
                history: []
            }

            return group
            
        }


        

        return null
    },

    addMessage: (msg: Message) => {
        let group = get().findGroup(msg.groupId) || get().createCroupFromMessage(msg) 
        console.log('add-message:', msg, group)
        if (group === null) {
            return
        }

        group.history.push(msg)

        get().setActive(group)
    },

    findGroup: (id: string) =>  {
        return get().list.find(e => e.id === id)
    },

    setActive: (contact: Group) => {
        set(() => ({ active: contact }))
    }

}))