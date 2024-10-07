

import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useMessageStore } from '@/stores/message'
import { Chat, ChatType, GroupChat, SingleChat } from '@/types'

import { ChangeEvent, useEffect, useState } from 'react'


import GroupCard from './GroupCard'
import SingleCard from './SingleCard'

const MessageList = () => {
    const chatList = useMessageStore(state => state.chatList)

    const [list, setList] = useState<Array<Chat>>(chatList)
    const setCurrent = useMessageStore(state => state.setActive)

    useEffect(() => {
        setList(chatList)
    }, [chatList])

    const onSearchChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const keyword = evt.target.value

        setList(chatList.filter(e => {
            const sChat = e as SingleChat
            const gChat = e as GroupChat
            return (sChat.type === ChatType.Single && sChat.to.username.includes(keyword)) || 
                 (gChat.type === ChatType.Group && gChat.group.name.includes(keyword))
        }))
    }

    return (
        <div className="w-60 border-r p-2 relative flex flex-col">
            <SearchBar onChange={onSearchChange}/>
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
