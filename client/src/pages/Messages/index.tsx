
import Info from '@/components/Info'
import Chat from '@/pages/Messages/components/Chat'
import { useMessageStore } from '@/stores/message'

import Empty from '@/components/Empty'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { Content, Message, MessageType, SingleChat, UserSummary } from '@/types'
import { useEffect } from 'react'
import MessageList from './components/MessageList'



const Messages = () => {
    const { active, list, setActive} = useMessageStore()

    const user = useUserStore(state => state.user)
    const sendMessage = useWsStore(state => state.sendMessage)

    useEffect(() => {
        if (list.length) {
            setActive(list[0])
        }
    }, [])

    const onSend = (content:Content) => {
        if (!user || !active) return

        const from:UserSummary = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            email: user.email
        }
        
        const msg:Message = {
            type: MessageType.Chat,

            from: from,
            to: (active as SingleChat).to,

            chatId: active.id,
            chatType: active.type,

            contentType: content.type,
            content: content.value
        }

        sendMessage(msg)
    }

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                <MessageList/>
            </div>
            {/* Chat */}

            { 
                active ? 
                <>
                    <Chat group={active} onSend={onSend}/>
                    {/* <div className="w-60 border-l">
                        <Info group={active}/>
                    </div> */}
                </> :
                <Empty/>
            }
        </div>
    )
}

export default Messages
