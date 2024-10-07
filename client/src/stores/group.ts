import { UserSummary } from '@/types'
import request from '@/utils/request'
import { group } from 'console'
import { create } from 'zustand'

const BASE = import.meta.env.VITE_APP_URL

export type Group = {
    id: string,
    name: string,
    desc: string,
    owner: UserSummary
    members: Array<UserSummary>
}

type GroupStore = {
    active: Group | null
    list: Array<Group>
    setActive: (group:Group) => void,
    createGroup: (name: string, desc: string, memberIds: Array<number>) => Promise<boolean>
    getList: () => Promise<Array<Group>>
    clear: () => void
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    active: null,
    list: [],
    
    setActive: (group: Group) => {
        set(() => ({active: group}))
    },

    createGroup: async (name: string, desc: string, memberIds: Array<number>) => {
        const res = await request({
            url: BASE + '/group',
            data: {
                name,
                desc,
                memberIds
            },
            method: 'POST'
        })

        return res.success
    },

    getList: async () => {
        const res = await request({
            url: BASE + '/group/list',
            method: "GET"
        })

        if (res.success) {
            console.log('get-group:', res)
            const list = res.data.map((e:any) => ({
                ...e.group,
                members: e.members
            }))
            set(() => ({ list }))
        }
        
        return get().list
    },

    clear: () => {
        set(() => ({
            active: null,
            list: []
        }))
    }
}))