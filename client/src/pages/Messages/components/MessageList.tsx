
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useGroupStore } from '@/stores/group'
import { Group } from '@/types'
import { useState } from 'react'

const MessageList = () => {
    const messages = useGroupStore(state => state.list)

    const [list, setList] = useState<Array<Group>>(messages)
    const setCurrent = useGroupStore(state => state.setActive)
    console.log('messages:', messages)
    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map(e => (
                        <div 
                            key={e.name} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
                            onClick={() => setCurrent(e) }
                        >
                            <Avatar name={e.name} avatar={e.avatar}/>
                            <div>
                                <div className="font-bold text-base">{e.name}</div>
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
