import { Contact, User } from "@/types";

// type UserStore = {
//     set: (user:User) => void
//     delete: () => void
//     get: () => User | null
// }

const STORAGE = sessionStorage

export const userStorage = {
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


export const contactStorage = {
    setList: (list: Array<Contact>) => {
        STORAGE.setItem('contact.list', JSON.stringify(list))
    },
    getList: () => {
        const listString = STORAGE.getItem('contact.list')

        if (listString === null) return []

        return JSON.parse(listString) as Array<Contact>
    }
}
