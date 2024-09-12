
import Chat from '../components/Chat'
import Info from '../components/Info'
// import MessageList from '../components/MessageList'
import MessageList from '../components/MessageList'

const Messages = () => {

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
            <div className="w-80 border-l">
                <Info/>
            </div>
        </div>
    )
}

export default Messages
