export type User = {
    id: string
    name: string
    avatar: string
    token?: string
    gender?: number
    birth?: string
}

export type Content = {
    from: User
    content: string
}

export type Message = {
    contact: User
    history: Array<Content>
}