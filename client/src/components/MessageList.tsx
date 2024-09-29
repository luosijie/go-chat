
import { useContactStore } from '@/stores/contact'
import Empty from './Empty'
import SearchBar from './SearchBar'

const MessageList = () => {
    const messages = useContactStore(state => state.list)
    const setCurrent = useContactStore(state => state.setActive)
    console.log('messages:', messages)
    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    messages.map(e => (
                        <div 
                            key={e.user.username} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100"
                            onClick={() => setCurrent(e) }
                        >
                            <img src={e.user.avatar} alt="avatar" className="size-14 bg-gray-50 rounded-full object-fill"/>
                            <div>
                                <div className="font-bold text-base">{e.user.username}</div>
                                {e.history[0] &&<div className="text-sm text-gray-500">{e.history[0].content.slice(0, 10)}</div>}
                            </div>
                        </div>
                    ))
                }
                <Empty text='No message here...'/>
            </div>
        </>
    )
}

export default MessageList
