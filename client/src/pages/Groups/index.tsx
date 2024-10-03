
import Info from '@/components/Info'
import Chat from '@/pages/Messages/components/Chat'
import { useMessageStore } from '@/stores/message'

import Empty from '@/components/Empty'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { Content, GroupType, Message, MessageType, SingleGroup, UserSummary } from '@/types'
import MessageList from './components/MessageList'



const Messages = () => {
    const active = useMessageStore(state => state.active)
    const user = useUserStore(state => state.user)
    const sendMessage = useWsStore(state => state.sendMessage)

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
            to: (active as SingleGroup).to,

            groupId: active.id,
            groupType: GroupType.Single,

            contentType: content.type,
            content: content.value
        }

        console.log('ws:send', msg)
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
                    <div className="w-60 border-l">
                        <Info group={active}/>
                    </div>
                </> :
                <Empty/>
            }
        </div>
    )
}

export default Messages
