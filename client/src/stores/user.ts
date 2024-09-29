import { User } from '@/types'
import request from '@/utils/request'
import { userStorage } from '@/utils/storage'
import { create } from 'zustand'

const BASE = import.meta.env.VITE_APP_URL
// const BASE_WS = import.meta.env.VITE_APP_WS

type UserStore = {
    user: User | null
    setUser: (user?: User) => void
    login: (username: string, password: string) => any
    logout: () => void
    // connectWS: () => void
}


export const useUserStore = create<UserStore>((set, get) => ({
    user: userStorage.get(),
    setUser: (user?: User) => {

        if (user === undefined) {
            const userStored = userStorage.get()
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
            // get().connectWS()
        }

        return res
    },
    // connectWS: () => {
    //     const user = get().user
    //     if (user === null) return
    //     const ws = new WebSocket(`${BASE_WS}/connect?Token=${user.token}`)
    //     ws.onopen = evt => {
    //         console.log('[ws:open]', evt)
    //     }
    //     ws.onmessage = evt => {
    //         const data = JSON.parse(evt.data)
    //         console.log('[ws:onmessage]', data)
    //     }
    // },
    logout: () => {
        set(() => ({ user: null }))
        userStorage.delete()
        location.href = '/login'
    }
}))