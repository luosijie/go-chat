
// import MessageList from '../components/MessageList'
import { useFriendStore } from '@/stores/friend'
import { UserSummary } from '@/types'
import { useEffect, useState } from 'react'
import FriendList from './components/FriendList'
import FriendPanel from './components/FriendPanel'

const Groups = () => {

    const getList = useFriendStore(state => state.getList)

    const [active, setActive] = useState<UserSummary | null>(null) 


    useEffect(() => {
        getList()
    }, [])
    
    const onRemove = () => {
        getList()
        setActive(null)
    }

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                {/* <MessageList/> */}
                <FriendList onClick={u => setActive(u)}/>
            </div>
            {/* Chat */}
            <FriendPanel user={active} onRemove={onRemove}/>
        </div>
    )
}

export default Groups
