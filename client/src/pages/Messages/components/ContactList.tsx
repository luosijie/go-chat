
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useContactStore } from '@/stores/contact'
import { Contact } from '@/types'
import { useState } from 'react'

const MessageList = () => {
    const messages = useContactStore(state => state.list)

    const [list, setList] = useState<Array<Contact>>(messages)
    const setCurrent = useContactStore(state => state.setActive)
    console.log('messages:', messages)
    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map(e => (
                        <div 
                            key={e.user.username} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
                            onClick={() => setCurrent(e) }
                        >
                            <Avatar user={e.user} />
                            <div>
                                <div className="font-bold text-base">{e.user.username}</div>
                                {e.history[0] &&<div className="text-sm text-gray-500">{e.history[0].content.slice(0, 10)}</div>}
                            </div>
                        </div>
                    )) :
                    <Empty text='No message here...'/>
                }
            </div>
        </>
    )
}

export default MessageList
