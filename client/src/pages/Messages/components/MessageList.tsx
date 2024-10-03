
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useMessageStore } from '@/stores/message'
import { Chat, ChatType, MultipleChat, SingleChat } from '@/types'
import { useEffect, useState } from 'react'

const MessageList = () => {
    const messages = useMessageStore(state => state.list)

    const [list, setList] = useState<Array<Chat>>(messages)
    const setCurrent = useMessageStore(state => state.setActive)

    useEffect(() => {
        setList(messages)
    }, [messages])

    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map((e:Chat) => {
                        const single = e as SingleChat
                        const multiple = e as MultipleChat
                        return <div key={e.id}>
                            {
                                single.type === ChatType.Single &&  <div 
                                    key={single.to.username} 
                                    className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
                                    onClick={() => setCurrent(e) }
                                >
                                    <Avatar name={single.to.username} avatar={single.to.avatar}/>
                                    <div>
                                        <div className="font-bold text-base">{single.to.username}</div>
                                        {   
                                            single.history.length && <div className="text-sm text-gray-500">{single.history[single.history.length - 1].content.slice(0, 10)}</div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    }) :
                    <Empty text='No message here...'/>
                }
            </div>
        </>
    )
}

export default MessageList
