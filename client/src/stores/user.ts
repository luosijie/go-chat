import { User } from '@/types'
import request from '@/utils/request'
import { userStorage } from '@/utils/storage'
import { create } from 'zustand'

const BASE = import.meta.env.VITE_APP_URL

type UserStore = {
    user: User | null
    setUser: (user?: User) => void
    login: (username: string, password: string) => any
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: userStorage.get(),
    setUser: (user?: User) => {

        if (user === undefined) {
            const userStored = userStorage.get()
            console.log('userStoreduserStored', userStored)
            set(() => ({ user: userStored }))
        } else {
            userStorage.set(user)
            set(() => ({ user }))
        }
    },
    login: async (username: string, password: string) => {
        const res = await request({
            url: BASE + '/login',
            method: 'POST',
            data: {
                username,
                password
            }
        })

        if (res.success) {
            get().setUser(res.data)
        }

        return res
    }
}))