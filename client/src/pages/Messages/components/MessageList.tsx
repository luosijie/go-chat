

import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useMessageStore } from '@/stores/message'
import { Chat, ChatType, GroupChat, SingleChat } from '@/types'
import { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import SingleCard from './SingleCard'

const MessageList = () => {
    const messages = useMessageStore(state => state.list)

    const [list, setList] = useState<Array<Chat>>(messages)
    const setCurrent = useMessageStore(state => state.setActive)

    useEffect(() => {
        setList(messages)
    }, [messages])

    return (
        <div className="w-60 border-r p-2 relative flex flex-col">
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map((e:Chat) => {
                        const singleChat = e as SingleChat
                        const groupChat = e as GroupChat
                        return <div key={e.id}>
                            {
                                singleChat.type === ChatType.Single &&  <SingleCard data={singleChat} onClick={ setCurrent }/>
                            }
                            {
                                groupChat.type === ChatType.Group && <GroupCard data={groupChat} onClick={ setCurrent } /> 
                            }
                        </div>
                    }) :
                    <Empty text='No message here...'/>
                }
            </div>
        </div>
    )
}

export default MessageList
