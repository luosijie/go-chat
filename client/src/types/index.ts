export type User = {
    id: number
    avatar: string
    username: string
    token: string
    email: string
}

export type Content = {
    from: User
    content: string
}

export type Message = {
    contact: User
    history: Array<Content>
}