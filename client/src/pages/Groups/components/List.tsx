
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import GroupAvatar from '@/components/GroupAvatar'
import SearchBar from '@/components/SearchBar'
import { Group, useGroupStore } from '@/stores/group'

import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
    onClick: (group: Group) => void
}

const ContactsList = ({ onClick } : Props) => {
    const groups = useGroupStore(state => state.list)

    const [list, setList] = useState<Array<Group>>([])


    useEffect(() => {
        setList(groups)
    }, [groups])

    const onSearchChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const keyword = evt.target.value

        setList(groups.filter(e => e.name.includes(keyword)))
    }

    // const setCurrent = useMessageStore(state => state.setCurrent)
    return (
        <>
            <SearchBar placeholder='Search by name' onChange={onSearchChange}/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map(group => (
                        <div 
                            key={group.id} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
                            onClick={() => onClick(group) }
                        >
                            <GroupAvatar members={group.members}/>
                            {/* <Avatar name={group.name} avatar={group.avatar} className='flex-shrink-0'/> */}
                            <div className='overflow-hidden [&>div]:text-ellipsis [&>div]:overflow-hidden'>
                                <div className='font-bold text-xl'>{ group.name }</div>
                                {/* <div className='text-gray-500'>{ group.email }</div> */}
                            </div>
                            
                        </div>
                    )) :
                    <Empty text='No groups here...'/>
                }
            </div>
        </>
    )
}

export default ContactsList
