import { Group } from '@/types'
import { groupStorage } from '@/utils/storage'
import { create } from 'zustand'

type GroupStore = {
    active: Group | null
    list: Array<Group>
    addGroup: (user: Group) => Group
    findGroup: (id: string) => Group | undefined
    setActive: (contact: Group) => void
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    active: null,
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

    findGroup: (id: string) =>  {
        return get().list.find(e => e.id === id)
    },

    setActive: (contact: Group) => {
        set(() => ({ active: contact }))
    }

}))