
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useGroupStore } from '@/stores/group'
import { Group, GroupType, MultipleGroup, SingleGroup } from '@/types'
import { useEffect, useState } from 'react'

const MessageList = () => {
    const messages = useGroupStore(state => state.list)

    const [list, setList] = useState<Array<Group>>(messages)
    const setCurrent = useGroupStore(state => state.setActive)

    useEffect(() => {
        setList(messages)
    }, [messages])

    return (
        <>
            <SearchBar/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map((e:Group) => {
                        const single = e as SingleGroup
                        const multiple = e as MultipleGroup
                        return <div key={e.id}>
                            {
                                single.type === GroupType.Single &&  <div 
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
