
import Chat from '@/components/Chat'
import Info from '@/components/Info'
import { useMessageStore } from '@/stores/message'
// import MessageList from '../components/MessageList'
import MessageList from '@/components/MessageList'

const Messages = () => {
    const current = useMessageStore(state => state.current)

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                <MessageList/>
            </div>
            {/* Chat */}
            <div className="flex-grow">
                <Chat/>
            </div>
            {/* Info */}
            {
                current &&
                <div className="w-60 border-l">
                    <Info/>
                </div>
            }
        </div>
    )
}

export default Messages
