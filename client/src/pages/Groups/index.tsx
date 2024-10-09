
// import MessageList from '../components/MessageList'
import EmptyPage from '@/components/EmptyPage'
import { Group, useGroupStore } from '@/stores/group'
import { useEffect } from 'react'

import { useMessageStore } from '@/stores/message'
import Detail from './components/Detail'
import List from './components/List'

const Groups = () => {

    const { active, setActive, getList, deleteGroup, exitGroup} = useGroupStore()
    const deleteChat = useMessageStore(state => state.deleteChat)

    useEffect(() => {
        getList()
    }, [])

    const handleDelete = (group: Group) => {
        deleteGroup(group.id)
        const chatId = String(group.id)
        deleteChat(chatId)
    }
    
    const handleExitGroup = (group: Group) => {
        exitGroup(group.id)
        const chatId = String(group.id)
        deleteChat(chatId)
    }

    return (
        <div className="flex justify-between h-full">
            <div className="w-60 border-r p-2 relative flex flex-col">
                <List onClick={u => setActive(u)}/>
            </div>
            {
                active ?
                <Detail group={active} onDelete={() => handleDelete(active)} onExit={() => handleExitGroup(active)}/> :
		        <EmptyPage/>
            } 
        </div>
    )
}

export default Groups
