import { Group } from "@/stores/group"


// Types for user
export type User = {
    id: number
    avatar: string
    username: string
    token: string
    email: string
}

export type UserSummary = {
    id: number
    avatar: string
    username: string
    email: string
}

// Types for message
export enum MessageType {
    Notice = "notice",
    Chat = "chat",
}

export enum ContentType {
	Text   = "text",
	Emoji  = "emoji",
	Image  = "image"
}


export enum ChatType {
    Single = "single",
    Group = "group"
}

// export type Chat = {
//     id: string
//     type: ChatType
//     name: string
//     owner: UserSummary
//     desc: string
//     members: Array<UserSummary>
//     history: Array<Message>
// }

export type SingleChat = {
    type: ChatType.Single
    id: string
    from: UserSummary
    to: UserSummary
    history: Array<Message>
}

export type GroupChat = {
    type: ChatType.Group
    id: string
    group: Group
    history: Array<Message>
}

export type Chat = SingleChat | GroupChat

export type Message = {
    type: MessageType

    from: UserSummary
    to: UserSummary

    chatType: ChatType
    chatId: string
    
    contentType: ContentType
    content: string

    date?: string
}


export type Content = {
    type: ContentType
    value: string
}
