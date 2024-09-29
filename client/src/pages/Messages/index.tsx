
import Chat from '@/components/Chat'
import Info from '@/components/Info'
import { useContactStore } from '@/stores/contact'
// import ContactList from '../components/ContactList'
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { Content, ContentType, GroupType, Message, MessageType, UserSummary } from '@/types'
import ContactList from './components/ContactList'

const ChatHeader = (user: UserSummary) => {
    return <>
        <Avatar user={user} className='size-9'/>
        <span className="font-bold text-lg">{ user.username }</span>
    </>
}

const Messages = () => {
    const active = useContactStore(state => state.active)
    const user = useUserStore(state => state.user)
    const sendMessage = useWsStore(state => state.sendMessage)

    const onSend = (content:Content) => {
        if (!user || !active) return
        const msg:Message = {
            type: MessageType.Chat,

            from: user.id,
            to: active.user.id,

            groupId: [user.id, active.user.id].join("-"),
            groupType: GroupType.Single,

            contentType: content.type,
            content: content.value
        }

        sendMessage(msg)
    }

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                <ContactList/>
            </div>
            {/* Chat */}

            { 
                active ? 
                <>
                    <Chat header={ChatHeader(active.user)} onSend={onSend}/>
                    <div className="w-60 border-l">
                        <Info user={active.user}/>
                    </div>
                </> :
                <Empty/>
            }
        </div>
    )
}

export default Messages
