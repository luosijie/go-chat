import { User } from "@/types";

type UserStore = {
    set: (user:User) => void
    delete: () => void
    get: () => User | null
}

const STORAGE = sessionStorage

export const userStorage:UserStore = {
    set: (user:User) => {
        STORAGE.setItem('user', JSON.stringify(user))
    },
    delete: () => {
        STORAGE.removeItem('user')
    },
    get: () => {
        const userString = STORAGE.getItem('user')
    
        if (userString === null) return null
    
        return JSON.parse(userString)
    }
}
