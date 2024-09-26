
// import MessageList from '../components/MessageList'
import SearchBar from '@/components/SearchBar'
import { useContractsStore } from '@/stores/contracts'
import { UserSummary } from '@/types'
import { Search, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import ContactsList from './components/ContactsList'
import ContactsPanel from './components/ContactsPanel'

const Messages = () => {

    const getList = useContractsStore(state => state.getList)

    const [active, setActive] = useState<UserSummary | null>(null) 


    useEffect(() => {
        getList()
    }, [])
    
    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <div className="w-60 border-r p-2 relative flex flex-col">
                {/* <MessageList/> */}
                <ContactsList onClick={u => setActive(u)}/>
            </div>
            {/* Chat */}
            <ContactsPanel contacts={active}/>
        </div>
    )
}

export default Messages
