
import { useMessageStore } from '../stores/message'
import SearchBar from './SearchBar'

const MessageList = () => {
    const messages = useMessageStore(state => state.messages)
    const setCurrent = useMessageStore(state => state.setCurrent)
    console.log('messages:', messages)
    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    messages.map(e => (
                        <div 
                            key={e.contact.id} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100"
                            onClick={() => setCurrent(e) }
                        >
                            <img src={e.contact.avatar} alt="avatar" className="size-14 bg-gray-50 rounded-full object-fill"/>
                            <div>
                                <div className="font-bold text-base">{e.contact.name}</div>
                                <div className="text-sm text-gray-500">{e.history[0].content.slice(0, 10)}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MessageList
