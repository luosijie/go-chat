

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

export type Group = {
    id: string
    type: GroupType
    name: string
    avatar: string
    owner: UserSummary
    to: UserSummary /// only available when type = single
    desc: string
    members: Array<UserSummary>
    history: Array<Message>
}

export type Message = {
    type: MessageType

    from: number
    to: number

    groupType: GroupType
    groupId: string

    
    contentType: ContentType
    content: string
}


export type Content = {
    type: ContentType
    value: string
}
