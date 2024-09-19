import { User } from '@/types'
import { userStorage } from '@/utils/storage'
import { create } from 'zustand'

type UserStore = {
    user: User | null
    setUser: (user?: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
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
    }
}))