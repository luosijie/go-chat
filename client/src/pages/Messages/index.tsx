
import Chat from '@/components/Chat'
import Info from '@/components/Info'
import { useGroupStore } from '@/stores/group'
// import ContactList from '../components/ContactList'
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { Content, ContentType, Group, GroupType, Message, MessageType, UserSummary } from '@/types'
import ContactList from './components/ContactList'

const ChatHeader = (group: Group) => {
    return <>
        {/* <Avatar user={user} className='size-9'/> */}
        <span className="font-bold text-lg">{ group.name }</span>
    </>
}

const Messages = () => {
    const active = useGroupStore(state => state.active)
    const user = useUserStore(state => state.user)
    const sendMessage = useWsStore(state => state.sendMessage)

    const onSend = (content:Content) => {
        if (!user || !active) return
        const msg:Message = {
            type: MessageType.Chat,

            from: user.id,
            to: active.to.id,

            groupId: [user.id, active.id].join("-"),
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
                    <Chat header={ChatHeader(active)} onSend={onSend}/>
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
