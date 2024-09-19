import { User } from "@/types";

type UserStore = {
    set: (user:User) => void
    delete: (user:User) => void
    get: () => User | null
}

export const userStorage:UserStore = {
    set: (user:User) => {
        localStorage.setItem('user', JSON.stringify(user))
    },
    delete: () => {
        localStorage.removeItem('user')
    },
    get: () => {
        const userString = localStorage.getItem('user')
    
        if (userString === null) return null
    
        return JSON.parse(userString)
    }
}
