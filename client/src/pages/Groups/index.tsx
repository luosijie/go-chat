
// import MessageList from '../components/MessageList'
import EmptyPage from '@/components/EmptyPage'
import { Group, useGroupStore } from '@/stores/group'
import { useEffect, useState } from 'react'

import Detail from './components/Detail'
import List from './components/List'

const Groups = () => {

    const { active, setActive, getList, deleteGroup, exitGroup} = useGroupStore()




    useEffect(() => {
        getList()
    }, [])
    

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                {/* <MessageList/> */}
                <List onClick={u => setActive(u)}/>
            </div>
            {/* Chat */}
            {
                active ?
                <Detail group={active} onDelete={() => deleteGroup(active.id)} onExit={() => exitGroup(active.id)}/> :
		        <EmptyPage/>
            } 
        </div>
    )
}

export default Groups
