
import Avatar from '@/components/Avatar'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import { useFriendStore } from '@/stores/friend'
import { UserSummary } from '@/types'

import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
    onClick: (user: UserSummary) => void
}

const ContactsList = ({ onClick } : Props) => {
    const contacts = useFriendStore(state => state.list)

    const [list, setList] = useState<Array<UserSummary>>([])


    useEffect(() => {
        setList(contacts)
    }, [contacts])

    const onSearchChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const keyword = evt.target.value

        setList(contacts.filter(e => e.username.includes(keyword)))
    }

    // const setCurrent = useMessageStore(state => state.setCurrent)
    return (
        <>
            <SearchBar placeholder='Search by name' onChange={onSearchChange}/>
            <div className="flex-grow overflow-y-auto mt-2">
                {
                    list.length ?
                    list.map(user => (
                        <div 
                            key={user.id} 
                            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer h-24 hover:bg-gray-50"
                            onClick={() => onClick(user) }
                        >
                            <Avatar name={user.username} avatar={user.avatar} className='flex-shrink-0'/>
                            <div className='overflow-hidden [&>div]:text-ellipsis [&>div]:overflow-hidden'>
                                <div className='font-bold text-xl'>{ user.username }</div>
                                <div className='text-gray-500'>{ user.email }</div>
                            </div>
                            
                        </div>
                    )) :
                    <Empty text='No contacts here...'/>
                }
            </div>
        </>
    )
}

export default ContactsList
