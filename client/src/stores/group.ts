import request from '@/utils/request'
import { create } from 'zustand'

const BASE = import.meta.env.VITE_APP_URL

export type Group = {
    id: string,
    name: string,
    desc: string,
    members: Array<Group>
}

type GroupStore = {
    list: Array<Group>
    createGroup: (name: string, desc: string, memberIds: Array<number>) => Promise<boolean>
    getList: () => Promise<Array<Group>>
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    list: [],
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
            set(() => ({ list: res.data }))
        }
        
        return get().list
    }
}))