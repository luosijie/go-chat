import { Random } from 'mockjs'
import { Content, Message, User } from '../types'

export const mockMessages = (user: User) => {
    const messages: Array<Message> = []
    const total = 20

    for (let i = 0; i < total; i++) {
        const contact: User = {
            id: String(Random.natural()),
            name: Random.name(),
            avatar: Random.dataImage()
        }

        const history: Array<Content> = []
        
        const num  =  Random.natural(0, 30)

        for (let i = 0; i < num; i++) {
            history.push({
                from:  Math.random() > .8 ? user : contact,
                content: Random.paragraph()
            })
        }

        const message: Message = {
            contact,
            history
        }

        messages.push(message)
    }
    
    return messages
}