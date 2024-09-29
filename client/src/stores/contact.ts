import { Contact, UserSummary } from '@/types'
import { contactStorage } from '@/utils/storage'
import { create } from 'zustand'

type ContactStore = {
    active: Contact | null
    list: Array<Contact>
    addContact: (user: UserSummary) => Contact
    setActive: (contact: Contact) => void
}

export const useContactStore = create<ContactStore>((set, get) => ({
    active: null,
    list: contactStorage.getList(),
    
    addContact: (user: UserSummary) => {
        console.log('user:', user)
        const list = get().list
        let exist = list.find(e => e.user.id === user.id)

        if (!exist) {
            const contact:Contact = {
                user,
                history: []
            } as Contact
            set(() => ({ list: [contact, ...get().list]}))  

            exist = contact
        }

        contactStorage.setList(get().list)

        return exist
    },

    setActive: (contact: Contact) => {
        set(() => ({ active: contact }))
    }
}))