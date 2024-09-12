import { create } from 'zustand'

type MenuStore = {
    active: string,
    setActive: (value: string) => void
}

export const useMenuStore = create<MenuStore>((set) => ({
    active: 'Messages',
    setActive: (value: string) => {
        set(() => ({active: value}))
    }
}))