

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


export enum GroupType {
    Single = "single",
    Multiple = "multiple"
}

// export type Group = {
//     id: string
//     type: GroupType
//     name: string
//     owner: UserSummary
//     desc: string
//     members: Array<UserSummary>
//     history: Array<Message>
// }

export type SingleGroup = {
    type: GroupType.Single
    id: string
    from: UserSummary
    to: UserSummary
    history: Array<Message>
}

export type MultipleGroup = {
    type: GroupType.Multiple
    id: string
    ower: UserSummary
    name: string
    desc: string
    members: Array<UserSummary>
    history: Array<Message>
}

export type Group = SingleGroup | MultipleGroup

export type Message = {
    type: MessageType

    from: UserSummary
    to: UserSummary

    groupType: GroupType
    groupId: string
    
    contentType: ContentType
    content: string

    date?: string
}


export type Content = {
    type: ContentType
    value: string
}
