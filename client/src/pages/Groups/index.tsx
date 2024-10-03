
// import MessageList from '../components/MessageList'
import { Group, useGroupStore } from '@/stores/group'
import { useEffect, useState } from 'react'
import Detail from './components/Detail'
import List from './components/List'

const Groups = () => {

    const getList = useGroupStore(state => state.getList)

    const [active, setActive] = useState<Group | null>(null) 


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
                <List onClick={u => setActive(u)}/>
            </div>
            {/* Chat */}
            {/* <Detail user={active} onRemove={onRemove}/> */}
        </div>
    )
}

export default Groups
